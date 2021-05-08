import { AppContext } from 'next/app';
import { AppTreeType } from 'next/dist/next-server/lib/utils';

import { ApolloPageContext } from './ApolloPageContext';

/**
 * Apollo App Context
 */
export interface ApolloAppContext extends AppContext {
  ctx: ApolloPageContext;
  AppTree: AppTreeType;
}
