export const onClick = async (key: string) => {
  const url = `${process.env.NEXT_PUBLIC_FRONT_URL}/api/admin/cache/refresh-tag?tag=${key}`

  console.log("🚀 ~ onClick ~ url:", url)

  await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.CACHE_API_KEY || "cache"
    },
    next: {
      revalidate: 0
    }
  });
}