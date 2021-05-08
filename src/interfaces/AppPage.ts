import { NextComponentType } from 'next';

import { ApolloPageContext } from './ApolloPageContext';

/**
 * App Page
 */
export type AppPage<IP = Record<string, unknown>, P = Record<string, unknown>> = NextComponentType<
  ApolloPageContext,
  IP,
  P
>;
