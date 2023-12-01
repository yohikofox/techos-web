import classNames from "classnames"
import { ComponentProps } from "@/app/(admin)/components/AdminLayout/_parts/ComponentProps";

export default function Component({ className }: ComponentProps) {
  return (
    <>
      <header className={classNames(className)}>
        <h1>Administration</h1>
        <Actions />
      </header>
    </>
  )
}



const Actions = () => {
  return (
    <>
      Actions
    </>
  )
}