import { NextComponentType } from 'next';
import Router from 'next/router';
import { createContext, useContext } from 'react';

import { UserDocument, UserQuery, UserQueryVariables } from '../apis';
import { SIGN_IN_URL } from '../constants';
import { ApolloPageContext } from '../interfaces';
import { getDisplayName } from '../utils';
import { getAccessToken, getAccessTokenPayload } from '../variables';

// Authorized User Context Value
type AuthorizedUserContextValue = UserQuery['user'];

/**
 * Authorized User Context
 */
export const AuthorizedUserContext = createContext<AuthorizedUserContextValue>(
  {} as AuthorizedUserContextValue
);

export const {
  Provider: AuthorizedUserProvider,
  Consumer: AuthorizedUserConsumer,
} = AuthorizedUserContext;

export function useAuthorizedUser() {
  return useContext(AuthorizedUserContext);
}

/**
 * With Authorized User
 *
 * @param Component
 * @returns
 */
export function withAuthorizedUser(Component: NextComponentType<ApolloPageContext, any, any>) {
  const WithAuthorizedUser: NextComponentType<
    ApolloPageContext,
    { user: UserQuery['user'] },
    any
  > = ({ user, ...props }) => {
    // Render
    return (
      <AuthorizedUserProvider value={user}>
        <Component {...props} />
      </AuthorizedUserProvider>
    );
  };

  WithAuthorizedUser.displayName = getDisplayName(Component, 'withAuthorizedUser');

  WithAuthorizedUser.getInitialProps = async context => {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(context) : {};

    const accessToken =
      typeof window === 'undefined' ? context.serverAccessToken : getAccessToken();

    if (accessToken) {
      const { uid } = getAccessTokenPayload(accessToken);
      const {
        data: { user },
      } = await context.apolloClient.query<UserQuery, UserQueryVariables>({
        query: UserDocument,
        variables: {
          userId: uid as string,
        },
      });

      return {
        ...pageProps,
        user,
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
    };
  };

  return WithAuthorizedUser;
}
