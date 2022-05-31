import fs from 'fs';
import winston from 'winston';
import expressWinston from 'express-winston';

const logsDirectory = `${ process.env.ROOT_PATH || '.' }/logs`;

if (!fs.existsSync(logsDirectory))
  fs.mkdirSync(logsDirectory);

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    winston.format.padLevels(),
    winston.format.splat(),
    winston.format.printf(info => `${ info.timestamp } ${ info.level }: ${ info.message }${ info.stack ? `\n${ info.stack }` : '' }`),
  ),
  transports: [
    new winston.transports.Console({ handleExceptions: true }),
    new winston.transports.File({ filename: 'logs/bot.log', maxFiles: 10, maxsize: 5 * 1000 * 1000, tailable: true, handleExceptions: true }),
  ],
});

export const requestLogger = expressWinston.logger({
  winstonInstance: logger,
  expressFormat: true,
});

export default logger;