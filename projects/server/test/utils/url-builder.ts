export const urlBuilder =
  (prefix = '/') =>
  (url: string): string =>
    `${prefix}${url}`;
