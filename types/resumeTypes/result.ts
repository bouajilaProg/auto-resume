/**
 * A standard result object for operations that can fail.
 */
export type Result<T, E = Error> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: E };
