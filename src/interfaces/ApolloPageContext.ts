import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { NextPageContext } from 'next';

/**
 * Apollo Page Context
 */
export interface ApolloPageContext extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  serverAccessToken?: string;
}
