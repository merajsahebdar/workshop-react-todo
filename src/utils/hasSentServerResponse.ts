import { ServerResponse } from 'node:http';

import { isServerSide } from './isServerSide';

/**
 * Whether the server has sent any response or not.
 *
 * @param response
 * @returns
 */
export function hasSentServerResponse(response?: ServerResponse) {
  return isServerSide() && (response?.headersSent || response?.writableEnded);
}
