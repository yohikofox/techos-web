export interface FormationPageProps { params: { slug: string } }

export default async function Page({ params: { slug } }: FormationPageProps) {
  return (
    <>{slug}</>
  )
}