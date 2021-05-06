import { InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { isLoggedInVar, loggedInUserIdVar } from '../variables';

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
          isLoggedIn: {
            read: () => isLoggedInVar(),
          },
          loggedInUserId: {
            read: () => loggedInUserIdVar(),
          },
        },
      },
    },
  }).restore(state);
}
