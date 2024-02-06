import RevalidateTagConstants from "@lib/constants/revalidateTag";
import { Result } from "R/src/lib/result";

enum ActionResult {
  SUCCESS = "success",
  UNHANDLED_ERROR = "unhandled_error",
}

export default async function trackPost(
  data: unknown
): Promise<Result<unknown, ActionResult>> {
  const strData: string = JSON.stringify(data);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FRONT_URL}/api/track`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: strData,
        cache: "no-cache",
        next: {
          revalidate: 0,
          tags: [RevalidateTagConstants.POST],
        },
      }
    );

    const result = await response.json();

    return Result.ok(result);
  } catch (e: unknown) {
    console.error(e);
  }
  return Result.error(ActionResult.UNHANDLED_ERROR);
}
