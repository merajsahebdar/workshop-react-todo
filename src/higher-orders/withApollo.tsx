//
// NOTO: This hook designed to be in use in `../pages/_app.tsx`
//

import { IncomingMessage } from 'http';
import { NextComponentType } from 'next';
import Head from 'next/head';
import { ApolloAppContext } from '../interfaces';
import { initiateApolloClient } from '../states';
import { fetchAccessToken, handleAccessTokenResponse, getDisplayName } from '../utils';
import {
  isLoggedInVar,
  loggedInUserIdVar,
  accessTokenVar,
  getAccessTokenPayload,
} from '../variables';

// With Apollo Options
type WithApolloOptions = {
  ssrMode?: boolean;
};

/**
 * Retrieve Access Token
 *
 * @param req
 * @returns
 */
async function getServerAccessToken(req?: IncomingMessage) {
  if (typeof window === 'undefined' && req?.headers.cookie) {
    try {
      const { parse } = await import('cookie');
      const { rt } = parse(req.headers.cookie);

      if (rt) {
        return await handleAccessTokenResponse(await fetchAccessToken({ cookie: `rt=${rt}` }));
      }
    } catch {
      // ...
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
      if (typeof window !== 'undefined' && serverAccessToken) {
        accessTokenVar(serverAccessToken);

        const { uid } = getAccessTokenPayload(serverAccessToken);

        isLoggedInVar(true);
        loggedInUserIdVar(uid as string);
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
      WithApollo.getInitialProps = async (appContext) => {
        const {
          AppTree,
          ctx: { req },
        } = appContext;

        const serverAccessToken = await getServerAccessToken(req);

        const client = initiateApolloClient({ serverAccessToken });
        appContext.ctx.apolloClient = client;

        if (serverAccessToken) {
          appContext.ctx.serverAccessToken = serverAccessToken;
        }

        const pageProps = Component.getInitialProps
          ? await Component.getInitialProps(appContext)
          : {};

        if (typeof window === 'undefined') {
          if (appContext.ctx.res?.headersSent || appContext.ctx.res?.writableEnded) {
            return pageProps;
          }

          if (ssrMode) {
            try {
              const { getDataFromTree } = await import('@apollo/client/react/ssr');
              await getDataFromTree(
                <AppTree
                  {...pageProps}
                  apolloClient={client}
                  serverAccessToken={serverAccessToken}
                />,
              );
            } catch {
              // ...
            }

            Head.rewind();
          }
        }

        return {
          ...pageProps,
          apolloState: client.cache.extract(),
          serverAccessToken,
        };
      };
    }

    return WithApollo;
  };
}
