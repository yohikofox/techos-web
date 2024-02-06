export default async function customFetch(
  url: string,
  options?: RequestInit
): Promise<Response> {
  let overriddenOptions: RequestInit | undefined = undefined;

  if (options) {
    overriddenOptions = { ...options };
    if (overriddenOptions.next) {
      const envValue: string | undefined = process.env.FORCE_NO_CACHE;

      const force_no_cache =
        envValue !== undefined ? envValue === "true" : false;

      if (overriddenOptions.next.revalidate !== undefined) {
        overriddenOptions.next.revalidate =
          force_no_cache === true ||
          overriddenOptions.next.revalidate === undefined
            ? 0
            : overriddenOptions.next.revalidate;
      }
    }
  }
  if (process.env.BUILD_MODE === "true") {
    return new Promise((resolve) => {
      resolve(
        new Response(
          JSON.stringify({
            data: "BUILD_MODE",
          }),
          { status: 200 }
        )
      );
    });
  }

  return fetch(url, overriddenOptions);
}
