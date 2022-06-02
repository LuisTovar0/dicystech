import winston from 'winston';
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV ??= 'development';

const transports = [];
if (process.env.NODE_ENV !== 'development') {
  transports.push(
    new winston.transports.Console()
  );
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
      )
    })
  );
}

const Logger = winston.createLogger({
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({stack: true}),
    winston.format.splat(),
    winston.format.json()
  ),
  transports
});

// const Logger = {
//   info: (str: string) => console.log('info'.green + `: ${str}`),
//   error: (str: string | Error) => console.log('\x1b[31m%s\x1b[0m', str),
// };

export default Logger;