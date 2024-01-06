import TagList from "./[page]/page"

export default function Page({ params }: { params: { slug: string } }) {
  const p = {
    page: "1",
    slug: params.slug
  }
  return (
    <>
      <TagList params={p} />
    </>
  )
}