import { InMemoryCache, NormalizedCacheObject } from '@apollo/client';

import { reactiveAuthState } from '../variables';

/**
 * Initiate an instance of `InMemoryCache`.
 *
 * @param state
 * @returns
 */
export function initiateApolloCache(state: NormalizedCacheObject) {
  return new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          authState: {
            read: () => reactiveAuthState(),
          },
        },
      },
    },
  }).restore(state);
}
