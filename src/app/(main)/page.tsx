import PostList, { PageProps } from "./posts/[page]/page";

export default async function Home(context: PageProps) {
  return (
    <>
      <PostList {...context} />
    </>
  );
}
