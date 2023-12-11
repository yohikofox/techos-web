
const refreshTag = async (value: string) => {
  try {
    const response = await fetch(`/api/admin/cache/refresh-tag?tag=${value}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'api-key': 'cache'
      },
      next: {
        revalidate: 0
      }
    })
    const data = await response.json()

    //TODO: push notification
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

export default refreshTag