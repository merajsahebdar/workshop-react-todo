import { API_URI } from '../constants';

/**
 * Fetch Access Token
 *
 * @returns
 */
export function fetchAccessToken(headers: HeadersInit = {}) {
  return fetch(API_URI, {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...headers,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      operationName: 'refreshToken',
      query: 'mutation refreshToken { refreshToken }',
    }),
  });
}

/**
 * Handle Access Token Response
 *
 * @param {Response} response
 * @returns
 */
export async function handleAccessTokenResponse(res: Response) {
  try {
    return (await res.json()).data.refreshToken;
  } catch {
    return null;
  }
}
