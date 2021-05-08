//
// NOTO: This hook designed to be in use in `../pages/_app.tsx`
//

import { NextComponentType } from 'next';
import Head from 'next/head';
import { IncomingMessage } from 'node:http';

import { ApolloAppContext } from '../interfaces';
import { initiateApolloClient } from '../states';
import {
  fetchAccessToken,
  getDisplayName,
  handleAccessTokenResponse,
  hasSentServerResponse,
  isServerSide,
} from '../utils';
import { setAccessToken } from '../variables';

// With Apollo Options
type WithApolloOptions = {
  ssrMode?: boolean;
};

/**
 * Retrieve Access Token
 *
 * @param request
 * @returns
 */
async function getServerAccessToken(request?: IncomingMessage) {
  if (request?.headers.cookie) {
    const { parse } = await import('cookie');
    const { rt } = parse(request.headers.cookie);

    if (rt) {
      return await handleAccessTokenResponse(await fetchAccessToken({ cookie: `rt=${rt}` }));
    }
  }
}

/**
 * Apollo Provider HOC
 *
 * @param options
 * @returns
 */
export function withApollo({ ssrMode = true }: WithApolloOptions = {}) {
  return (Component: NextComponentType<ApolloAppContext, any, any>) => {
    const WithApollo: NextComponentType<ApolloAppContext, any, any> = ({
      apolloState,
      apolloClient,
      serverAccessToken,
      ...props
    }) => {
      if (!isServerSide() && serverAccessToken) {
        setAccessToken(serverAccessToken);
      }

      return (
        <Component
          {...props}
          apolloClient={
            apolloClient ?? initiateApolloClient({ state: apolloState, serverAccessToken })
          }
        />
      );
    };

    WithApollo.displayName = getDisplayName(Component, 'withApollo');

    if (ssrMode || Component.getInitialProps) {
      registerGetInitialProps(ssrMode)(Component, WithApollo);
    }

    return WithApollo;
  };
}

/**
 * Register an initial props getter for composite component.
 *
 * @param ssrMode
 * @returns
 */
function registerGetInitialProps(ssrMode: boolean) {
  return (
    Component: NextComponentType<ApolloAppContext, any, any>,
    WithApollo: NextComponentType<ApolloAppContext, any, any>
  ) => {
    WithApollo.getInitialProps = async appContext => {
      const { AppTree, ctx } = appContext;

      if (isServerSide()) {
        ctx.serverAccessToken = await getServerAccessToken(ctx.req);
      }

      ctx.apolloClient = initiateApolloClient({ serverAccessToken: ctx.serverAccessToken });

      const pageProps = Component.getInitialProps
        ? await Component.getInitialProps(appContext)
        : {};

      if (hasSentServerResponse(ctx.res)) {
        return pageProps;
      }

      if (isServerSide() && ssrMode) {
        const { getDataFromTree } = await import('@apollo/client/react/ssr');
        await getDataFromTree(
          <AppTree
            {...pageProps}
            apolloClient={ctx.apolloClient}
            serverAccessToken={ctx.serverAccessToken}
          />
        );

        Head.rewind();
      }

      return {
        ...pageProps,
        apolloState: ctx.apolloClient.cache.extract(),
        serverAccessToken: ctx.serverAccessToken,
      };
    };
  };
}
