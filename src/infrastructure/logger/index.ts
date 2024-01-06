import winston from 'winston';
type LoggerMethod = (message?: any, ...optionalParams: any[]) => void

class LoggerFactory {
  private logger: any;

  constructor(logger: any) {
    this.logger = logger;

  }

  initialize() {
    // this.logger.log = this.log;
  }

  private log: LoggerMethod = (message?: any, ...optionalParams: any[]) => {

    // const str = process.env.NODE_ENV === 'production' ? JSON.stringify(message) : message;
    // process.stdout.write(message + '\n');
  }

  get instance() {
    return this.logger
  }
}


export default LoggerFactory;