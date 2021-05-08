/**
 * Whether is in server side or not.
 *
 * @returns
 */
export function isServerSide() {
  return typeof window === 'undefined';
}
