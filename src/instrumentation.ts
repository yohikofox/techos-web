// import { DependencyKeys } from "@/infrastructure/dependencies";
// import Container from "@/infrastructure/dependencyFactory";
// import ConfigManager from "@/infrastructure/adapter/configManager";

import Logger from "./infrastructure/logger";


export function register() {
  // const configManager = Container.Instance.resolve<ConfigManager>(DependencyKeys.helper_configmanager)
  //Then redefine the old console
  // initLogger(console)
  // initLogger(Logger)

  if (process.env.SSR_CHECK === 'verified') {
    const logger = new Logger(globalThis.console)
    logger.initialize()
    globalThis.console = logger.instance as Console
  }
}