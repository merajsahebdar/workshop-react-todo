import { NextComponentType } from 'next';
import Router from 'next/router';
import { createContext } from 'react';

import { SIGN_IN_URL } from '../constants';
import { ApolloPageContext } from '../interfaces';
import { getDisplayName } from '../utils';
import { getAccessToken, getAccessTokenPayload } from '../variables';

type LoginState =
  | {
      isLoggedIn: false;
    }
  | {
      isLoggedIn: true;
      loggedInUserId: string;
    };

// Login State Context Value
type LoginStateContextValue = LoginState;

/**
 * Login State Context
 */
export const LoginStateContext = createContext({} as LoginStateContextValue);

export const { Provider: LoginStateProvider, Consumer: LoginStateConsumer } = LoginStateContext;

/**
 * With Required Authentication
 *
 * @param Component
 * @returns
 */
export function withRequiredAuthentication(
  Component: NextComponentType<ApolloPageContext, any, any>
) {
  const WithRequiredAuthentication: NextComponentType<ApolloPageContext, LoginState, any> = ({
    isLoggedIn,
    loggedInUserId,
    ...props
  }) => {
    // Render
    return (
      <LoginStateProvider value={{ isLoggedIn, loggedInUserId }}>
        <Component {...props} />
      </LoginStateProvider>
    );
  };

  WithRequiredAuthentication.displayName = getDisplayName(Component, 'WithRequiredAuthentication');

  WithRequiredAuthentication.getInitialProps = async context => {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(context) : {};

    const accessToken =
      typeof window === 'undefined' ? context.serverAccessToken : getAccessToken();

    if (accessToken) {
      const { uid } = getAccessTokenPayload(accessToken);

      return {
        ...pageProps,
        isLoggedIn: true,
        loggedInUserId: uid as string,
      };
    }

    if (context.res) {
      context.res.writeHead(303, { Location: SIGN_IN_URL });
      context.res.end();
    } else {
      await Router.replace(SIGN_IN_URL);
    }

    return {
      ...pageProps,
      isLoggedIn: false,
    };
  };

  return WithRequiredAuthentication;
}
