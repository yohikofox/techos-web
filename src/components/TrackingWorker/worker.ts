const onmessageHandler = async (event: MessageEvent<{
  slug: string;
}>) => {
  const data = event.data;
  const response = await fetch('/api/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  postMessage(await response.json());
}

addEventListener('message', onmessageHandler);