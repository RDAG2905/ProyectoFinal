const winston = require('winston')

function buildLogger() {
  const logger = winston.createLogger({
    format: winston.format.cli(),
    transports: [
      new winston.transports.File({ filename: 'warn.log', level: 'warning' }),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.Console({ level: 'info' })
    ],
  })
  return logger
}


let logger = buildLogger()

module.exports =  logger