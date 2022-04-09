export const urlBuilder =
  (prefix = '/') =>
  (url: string) =>
    `${prefix}${url}`;
