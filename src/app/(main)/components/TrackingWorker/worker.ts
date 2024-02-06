import action from "./action";

const onmessageHandler = async (
  event: MessageEvent<{
    slug: string;
  }>
) => {
  const response = await action(event.data);

  if (response.IsError) {
    throw new Error(`Error from action: ${response.Result.join(",")}`);
  }

  postMessage(response.Value);
};

addEventListener("message", onmessageHandler);
