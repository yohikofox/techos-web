import classNames from "classnames"
import { ComponentProps } from "@/app/(admin)/components/AdminLayout/_parts/ComponentProps";
import styles from "./styles.module.scss"
import Profile from "./parts/Profile";
import Client from "./client"

export default function Component({ className }: ComponentProps) {
  return (
    <>
      <Client className={classNames(className, styles.container)}>
        <Actions />
        <Profile />
      </Client>
    </>
  )
}

const Actions = () => {
  return (
    <>

    </>
  )
}