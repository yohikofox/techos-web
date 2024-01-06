'use server';

export const onClick = async (key: string) => {
  const url = `${process.env.NEXT_PUBLIC_FRONT_URL}/api/admin/cache/refresh-tag?tag=${key}`

  await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.CACHE_API_KEY || ""
    },
    next: {
      revalidate: 0
    }
  });
}