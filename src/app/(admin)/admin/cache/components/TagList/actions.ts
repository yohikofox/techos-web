export const onClick = async (key: string) => {
  const url = `${process.env.NEXT_PUBLIC_FRONT_URL}/api/admin/cache/refresh-tag?tag=${key}`
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.CACHE_API_KEY || "cache"
      },
      next: {
        revalidate: 0
      }
    });

    if (response.ok) {
      return response
    } else {
      return {
        ok: false,
        message: `A problem occurred while calling: ${response.url} : ${response.statusText}`
      }
    }
  } catch (e: any) {
    return {
      ok: false,
      message: `A problem has occurred: ${e.message}`
    }
  }
}