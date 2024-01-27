import PostList from "./posts/[page]/page"

export default async function Home(context: any) {
  return (
    <>
      <PostList {...context} />
    </>
  )
}
