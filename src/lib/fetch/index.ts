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
        const revalidateTime =
          force_no_cache === true ||
          overriddenOptions.next.revalidate === undefined
            ? 0
            : overriddenOptions.next.revalidate;

        overriddenOptions.next.revalidate = revalidateTime;
      }
    }
  }

  if (process.env.BUILD_MODE === "true") {
    if (process.env.NODE_ENV === "production") {
      console.warn("BUILD_MODE activated. Fetching from local.");
    } else {
      console.log("BUILD_MODE activated. Fetching from local.");
    }

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

  if (overriddenOptions?.method !== undefined) {
    const hasRevalidateValue =
      overriddenOptions.next?.revalidate !== undefined &&
      ((typeof overriddenOptions.next?.revalidate === "number" &&
        overriddenOptions.next?.revalidate > 0) ||
        (typeof overriddenOptions.next?.revalidate === "boolean" &&
          overriddenOptions.next?.revalidate !== false));

    switch (overriddenOptions.method) {
      case "GET": {
        if (hasRevalidateValue === false) {
          console.warn(
            `It is recommended to use GET method with revalidate time for cache.`
          );
        }
        break;
      }
      case "POST":
      case "PUT":
      case "DELETE": {
        if (
          overriddenOptions?.queryMode !== true &&
          hasRevalidateValue === true
        ) {
          console.warn(
            `You must not use revalidate time with ${overriddenOptions.method} method on url ${url}. This is a mutation.`
          );
        }
        break;
      }
      default:
        console.warn(
          `The method ${overriddenOptions.method} is not recommended.`
        );
        break;
    }
  }

  // console.debug(
  //   "🚀 ~ overriddenOptions?.method:",
  //   overriddenOptions?.method,
  //   overriddenOptions?.next?.revalidate
  // );

  return fetch(url, overriddenOptions);
}
