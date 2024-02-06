export async function register() {
  /**
   * Bootstrap server side ONLY. Make sure to import Server dependencies after the following line
   */
  if (process.env.NEXT_RUNTIME === "nodejs") {
    import("./infrastructure/logger").then(({ default: Logger }) => {
      const l = new Logger(globalThis.console);
      l.initialize();
      globalThis.console = l.instance as Console;
    });
  }
}
