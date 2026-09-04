/**
 * Development-only logging utilities
 * These functions only log in development mode and are silent in production
 */

const isDev = process.env.NODE_ENV === 'development';

/**
 * Console.log wrapper that only logs in development environment
 */
export const devLog = (...args: unknown[]): void => {
  if (isDev) {
    console.log(...args);
  }
};

/**
 * Console.error wrapper that only logs in development environment
 */
export const devError = (...args: unknown[]): void => {
  if (isDev) {
    console.error(...args);
  }
};

/**
 * Console.warn wrapper that only logs in development environment
 */
export const devWarn = (...args: unknown[]): void => {
  if (isDev) {
    console.warn(...args);
  }
};

/**
 * Console.info wrapper that only logs in development environment
 */
export const devInfo = (...args: unknown[]): void => {
  if (isDev) {
    console.info(...args);
  }
};

/**
 * Console.debug wrapper that only logs in development environment
 */
export const devDebug = (...args: unknown[]): void => {
  if (isDev) {
    console.debug(...args);
  }
};

/**
 * Grouped console logs that only appear in development
 */
export const devGroup = (label: string, callback: () => void): void => {
  if (isDev) {
    console.group(label);
    callback();
    console.groupEnd();
  }
};

/**
 * Table logging that only appears in development
 */
export const devTable = (data: unknown): void => {
  if (isDev) {
    console.table(data);
  }
};
