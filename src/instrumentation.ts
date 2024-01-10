// import { DependencyKeys } from "@/infrastructure/dependencies";
// import Container from "@/infrastructure/dependencyFactory";
// import ConfigManager from "@/infrastructure/adapter/configManager";

export function register() {
  // const configManager = Container.Instance.resolve<ConfigManager>(DependencyKeys.helper_configmanager)

  /**
   * Bootstrap server side ONLY. Make sure to import Server dependencies after the following line
   */
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    import("./infrastructure/logger").then(({ default: Logger }) => {
      const l = new Logger(globalThis.console)
      l.initialize()
      globalThis.console = l.instance as Console
    })
  }
}