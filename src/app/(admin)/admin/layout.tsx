import SessionHandler from "@/app/(admin)/components/SessionHandler"
import AdminLayout from "../components/AdminLayout"

export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* <SessionHandler> */}
      <AdminLayout>
        {children}
      </AdminLayout>
      {/* </SessionHandler> */}
    </>
  )
}