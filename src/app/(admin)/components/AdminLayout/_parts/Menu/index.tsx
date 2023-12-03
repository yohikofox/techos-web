'use client'

import classNames from "classnames"
import NavHeader from "./parts/NavHeader"
import { ComponentProps } from "@/app/(admin)/components/AdminLayout/_parts/ComponentProps"
import useAdminStore from "R/src/infrastructure/store/admin"
import styles from "./styles.module.scss"

export default function Component({ className }: ComponentProps) {
  const isOpen = useAdminStore((state) => state.menu.isOpen)
  return (
    <section className={classNames(className, styles.container, {
      [styles.menu__opened]: isOpen
    })}>
      <nav>
        <NavHeader />
        <ul>
          <li><a href="#">LINK 1</a></li>
          <li><a href="#">LINK 2</a></li>
          <li><a href="#">LINK 3</a></li>
          <li><a href="#">LINK 4</a></li>
        </ul>
      </nav>
    </section>
  )
}