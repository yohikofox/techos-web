import { ComponentProps } from "@/app/(admin)/components/AdminLayout/_parts/ComponentProps";
import classNames from "classnames";
import styles from "./styles.module.scss"

export default function Component({ className }: ComponentProps) {
  return (
    <footer className={classNames(className, styles.container)}>
      FOOTER
    </footer>
  )
}