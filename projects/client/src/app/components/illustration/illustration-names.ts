// TODO: sync with the actual assets somehow

export const ILLUSTRATION_NAMES = [
  'accept-request',
  'add-tasks',
  'teamwork',
  'walking-outside',
] as const;

export type IllustrationName = typeof ILLUSTRATION_NAMES[number];
