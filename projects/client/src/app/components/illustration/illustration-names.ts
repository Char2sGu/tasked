export const ILLUSTRATION_NAMES = [
  'accept-request',
  'add-tasks',
  'teamwork',
  'walking-outside',
  'empty-street',
] as const;

export type IllustrationName = typeof ILLUSTRATION_NAMES[number];
