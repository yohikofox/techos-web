import { DependencyKeys } from "./business/dependencies";
import Container from "./business/dependencyFactory";
import ConfigManager from "./business/infrastructure/adapter/configManager";


export function register() {
  const configManager = Container.Instance.resolve<ConfigManager>(DependencyKeys.helper_configmanager)
}