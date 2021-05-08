import { makeVar, ReactiveVar } from '@apollo/client';

/**
 * Create a safe reactive variables.
 *
 * @param value
 * @returns
 */
export function makeSafeVar<T>(value: T): ReactiveVar<T> {
  if (typeof window === 'undefined') {
    return ((() => {
      throw new Error('Reactive variables can not be used in server side.');
    }) as unknown) as ReactiveVar<T>;
  }

  return makeVar<T>(value);
}
