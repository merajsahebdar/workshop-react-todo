import { makeSafeVar } from '../utils';

/**
 * This variable holds the current state of auth.
 */
export const isLoggedInVar = makeSafeVar(false);
