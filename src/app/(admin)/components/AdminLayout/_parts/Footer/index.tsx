'use client'

import classNames from "classnames";
import useAdminStore, { AdminStore } from "R/src/infrastructure/store/admin";

import { ComponentProps } from "@/app/(admin)/components/AdminLayout/_parts/ComponentProps";

import styles from "./styles.module.scss"

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