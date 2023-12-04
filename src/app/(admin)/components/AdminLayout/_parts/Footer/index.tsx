'use client'

import { ComponentProps } from "@/app/(admin)/components/AdminLayout/_parts/ComponentProps";
import classNames from "classnames";
import styles from "./styles.module.scss"
import useAdminStore, { AdminStore } from "R/src/infrastructure/store/admin";

export default function Component({ className }: ComponentProps) {
  const isOpen = useAdminStore((state: AdminStore) => state.menu.isOpen)

  return (
    <footer className={classNames(className, styles.container, {
      [styles.menu__closed]: !isOpen
    })}>
      @techos.dev, 2019
    </footer>
  )
}