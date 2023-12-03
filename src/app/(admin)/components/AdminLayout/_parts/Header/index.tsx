import classNames from "classnames"
import { ComponentProps } from "@/app/(admin)/components/AdminLayout/_parts/ComponentProps";
import styles from "./styles.module.scss"

export default function Component({ className }: ComponentProps) {
  return (
    <>
      <header className={classNames(className, styles.container)}>
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