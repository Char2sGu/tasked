import { config } from 'dotenv';
import { env } from 'process';

config();

const num = (k: string) => Number(env[k]);
const str = (k: string) => env[k];
const bool = (k: string) =>
  env[k] == 'true' ? true : env[k] == 'false' ? false : undefined;

export const PORT = num('PORT');
export const DB_PATH = str('DB_PATH');
export const SECRET_KEY = str('SECRET_KEY');
export const GRAPHQL_FREQUENCY_LIMIT = num('GRAPHQL_FREQUENCY_LIMIT');
export const GRAPHQL_FREQUENCY_DURATION = num('GRAPHQL_FREQUENCY_DURATION');
export const GRAPHQL_COMPLEXITY = num('GRAPHQL_COMPLEXITY');
export const GRAPHQL_DEPTH = num('GRAPHQL_DEPTH');
export const DEBUG = bool('DEBUG');
export const EMAIL_TRANSPORT = str('EMAIL_TRANSPORT');
export const EMAIL_FROM = str('EMAIL_FROM');
