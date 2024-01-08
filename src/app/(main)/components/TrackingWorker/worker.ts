const onmessageHandler = async (event: MessageEvent<{
  slug: string;
}>) => {
  const data = event.data;
  const strData = JSON.stringify(data);

  //TODO: export to server action
  const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/track`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: strData
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  postMessage(await response.json());
}

addEventListener('message', onmessageHandler);