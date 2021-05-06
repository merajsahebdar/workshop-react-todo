import { makeSafeVar } from '../utils';

/**
 * This variable holds the current logged-in user id.
 */
export const loggedInUserIdVar = makeSafeVar<string | null>(null);
