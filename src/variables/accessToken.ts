import jwtDecode from 'jwt-decode';
import { makeSafeVar } from '../utils';

/**
 * This variable holds the current access token.
 */
export const accessTokenVar = makeSafeVar<string | undefined>(undefined);

/**
 * Check whether the token is expired or not.
 *
 * @returns
 */
export function isAccessTokenExpired() {
  const accessToken = accessTokenVar();

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
export function getAccessTokenPayload(accessToken = accessTokenVar()) {
  if (typeof accessToken === 'undefined') {
    throw new Error('No access token provided to decode.');
  }

  return jwtDecode<Record<string, unknown>>(accessToken);
}
