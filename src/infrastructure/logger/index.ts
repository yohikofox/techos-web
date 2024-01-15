import winston, { transports, format, level } from 'winston';
import { red, italic } from "colorette"

import util from 'node:util';
import { SyslogConfigSetColors, SyslogConfigSetLevels } from 'winston/lib/winston/config';
import p from '../../../package.json';

type LoggerMethod = (message?: any, ...optionalParams: any[]) => void
const { prettyPrint, label, combine, timestamp, errors } = format
const DIVIDER = "====================================================================="
const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss  "
let STYLISH = false

const levelStyles: { [key: string]: (str: string) => string } = {
  emerg: (str: string) => str,
  alert: (str: string) => str,
  crit: (str: string) => str,
  error: (str: string) => red(italic(str)),
  warning: (str: string) => str,
  notice: (str: string) => str,
  info: (str: string) => str,
  debug: (str: string) => str,
}

const customLevels: { levels: SyslogConfigSetLevels, colors: SyslogConfigSetColors } = {
  levels: {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7,
  },
  colors: {
    emerg: 'red',
    alert: 'bold yellow',
    crit: 'bold red',
    error: 'italic red',
    warning: 'yellow',
    notice: 'dim cyan',
    info: 'green',
    debug: 'dim blue',
  },
};

enum Levels {
  EMERG = "emerg",
  ALERT = "alert",
  CRIT = "crit",
  ERROR = "error",
  WARNING = "warning",
  NOTICE = "notice",
  INFO = "info",
  DEBUG = "debug",
}

class LoggerFactory {
  private logger: any;
  private _winston: winston.Logger;
  private _debug_winston?: winston.Logger;

  constructor(logger: any) {
    this.logger = logger;

    const logLevel = process.env.DEFAULT_LOG_LEVEL || Levels.INFO

    this._winston = winston.createLogger({
      level: logLevel,
      levels: customLevels.levels,
    })

    winston.addColors(customLevels.colors)

    const printFormat = winston.format.printf(({ level, message, stack }) => {
      return `\n${DIVIDER}\n${level}: ${stack || message}\n${DIVIDER}\n`
    })

    this._winston.clear()

    const formatFunctions = [

    ]

    formatFunctions.push(winston.format.timestamp({ format: DATE_FORMAT }))
    formatFunctions.push(winston.format.errors({ stack: true }))

    if (process.env.NODE_ENV === 'development') {
      STYLISH = true;
      formatFunctions.push(winston.format.simple())
      formatFunctions.push(winston.format.colorize())

      formatFunctions.push(winston.format.splat())
      formatFunctions.push(winston.format.label({ label: p.name }))

      formatFunctions.push(winston.format.align())
      formatFunctions.push(winston.format.printf(({ level, message, label, timestamp }) => {
        return `${timestamp} [${label}] ${level}: ${message}`
      }))
    } else {
      formatFunctions.push(winston.format.uncolorize())
      formatFunctions.push(winston.format.json())
    }



    const consoleLogger = new transports.Console({
      format: combine(
        ...formatFunctions
      )
    })

    this._winston.add(consoleLogger)

    if (process.env.DEBUG_MODE === 'true') {
      this._debug_winston = winston.createLogger({
        level: Levels.DEBUG,
        levels: winston.config.syslog.levels,
      });
      this._debug_winston.clear()
      this._debug_winston.add(new transports.Console({
        level: Levels.DEBUG,
        format: combine(
          winston.format.colorize(),
          winston.format.cli(),
          printFormat
        )
      }))
    }

    // this._test("LoggerFactory initialized")
  }

  initialize() {
    this.logger.log = this.log;
    this.logger.debug = this.debug;
    this.logger.info = this.info;
    this.logger.warn = this.warn;
    this.logger.error = this.error;
  }

  private info: LoggerMethod = (message?: any, ...optionalParams: any[]) => {
    this._log(Levels.INFO, message, ...optionalParams)
  }

  private error: LoggerMethod = (message?: any, ...optionalParams: any[]) => {
    this._log(Levels.ERROR, message, ...optionalParams)
  }

  private warn: LoggerMethod = (message?: any, ...optionalParams: any[]) => {
    this._log(Levels.WARNING, message, ...optionalParams)
  }

  private log: LoggerMethod = (message?: any, ...optionalParams: any[]) => {
    this._log(Levels.INFO, message, ...optionalParams)
  }

  private debug: LoggerMethod = (message?: any, ...optionalParams: any[]) => {
    this._log(Levels.DEBUG, message, ...optionalParams)
    this._cli(Levels.DEBUG, message, ...optionalParams)
  }

  private _test: LoggerMethod = (message?: any, ...optionalParams: any[]) => {
    Object.values(Levels).forEach((level) => {
      this._log(level, message, ...optionalParams)
    })
  }

  private _log: LoggerMethod = (level: Levels, message?: any, ...optionalParams: any[]) => {
    let args = optionalParams ? [...optionalParams] : []

    const str = util.format(message, ...args)


    const colored = (STYLISH && levelStyles[level]) ? levelStyles[level](str) : str

    this._winston.log({ level, message: colored })
  }

  private _cli: LoggerMethod = (level: Levels, message?: any, ...optionalParams: any[]) => {
    let args = optionalParams ? [...optionalParams] : []

    const str = util.format(message, ...args)

    this._debug_winston?.log({
      level,
      message: str
    })
  }


  get instance() {
    return this.logger
  }

  get winston() {
    return this._winston
  }
}


export default LoggerFactory;