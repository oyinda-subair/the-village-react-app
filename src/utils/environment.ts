import { LogLevel } from './logger';

export type Environment = 'development' | 'production' | 'test';

export const RUNTIME_ENV = process.env.NODE_ENV;

export const APP_ENV: Environment = RUNTIME_ENV === 'production' ? 'production' : 'development';

export const LOG_LEVEL: LogLevel = APP_ENV === 'production' ? 'warn' : 'log';
