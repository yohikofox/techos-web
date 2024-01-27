'use client'

import classNames from "classnames";
import useAdminStore, { AdminStore } from "R/src/infrastructure/store/admin";

import { ComponentProps } from "@/app/(admin)/components/AdminLayout/_parts/ComponentProps";

import Footer from "../Footer";
import styles from "./styles.module.scss"

export default function Component({ children, className }: ComponentProps) {
  const isOpen = useAdminStore((state: AdminStore) => state.menu.isOpen)

  return (
    <>
      <div className={classNames(className, styles.container, {
        [styles.menu__closed]: !isOpen
      })}>
        {/* <article>
          <h2>
            REUSABLE ARTICLE
          </h2>
        </article>
        <aside>ASIDE</aside>
        <details>
          <summary>Click me</summary>
          <p>Hidden content</p>
        </details> */}
        <section className={styles.content__section}>
          {children}
        </section>
        <Footer className={styles.footer} />
      </div>
    </>
  )
}