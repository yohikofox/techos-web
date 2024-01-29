/* eslint-disable  no-var */
/* eslint-disable  unused-imports/no-unused-imports */
// import { IContainer } from '@/infrastructure/dependencyFactory'
import { hasProperty } from "@lib/prototypes/object";
declare global {
  // var IOC: () => IContainer;
  var hasProperty = hasProperty;
}
