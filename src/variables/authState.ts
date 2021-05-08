import jwtDecode from 'jwt-decode';

import { AuthState } from '../graphqlCodes';
import { makeSafeVar } from '../utils';

export const reactiveAuthState = makeSafeVar<AuthState>({ isLoggedIn: false });

/**
 * Retrieve the access token from auth state.
 *
 * @returns
 */
export function getAccessToken() {
  const authState = reactiveAuthState();
  if ('accessToken' in authState) {
    return authState.accessToken;
  }
}

/**
 * Set the access token into auth state.
 *
 * @returns
 */
export function setAccessToken(accessToken: string) {
  const { uid } = getAccessTokenPayload(accessToken);
  reactiveAuthState({
    accessToken,
    userId: uid as string,
  });
}

/**
 * Check whether the token is expired or not.
 *
 * @returns
 */
export function isAccessTokenExpired() {
  const accessToken = getAccessToken();

  if (accessToken) {
    const { exp } = getAccessTokenPayload(accessToken);

    if (Date.now() < (exp as number) * 1000) {
      return true;
    }
  }

  return false;
}

/**
 * Return payload value of the access token.
 *
 * @param accessToken
 * @returns
 */
export function getAccessTokenPayload(accessToken = getAccessToken()) {
  if (!accessToken) {
    throw new Error('No access token provided to decode.');
  }

  return jwtDecode<Record<string, unknown>>(accessToken);
}
