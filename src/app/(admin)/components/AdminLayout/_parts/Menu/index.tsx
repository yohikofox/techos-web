'use client'

import classNames from "classnames"
import NavHeader from "./parts/NavHeader"
import { ComponentProps } from "@/app/(admin)/components/AdminLayout/_parts/ComponentProps"
import useAdminStore from "R/src/infrastructure/store/admin"
import styles from "./styles.module.scss"
import Link from "next/link"


import { usePathname } from "next/navigation"
import { useShallow } from "zustand/react/shallow"
import ReactIcon from "@Admin/components/Icon/ReactIcon"
import ToggleMenuButton from "./parts/ToggleMenuButton"

export interface MenuProps extends ComponentProps {
}
function Component({ className }: MenuProps) {
  const { isOpen, links, toggle } = useAdminStore(useShallow((state) => ({ isOpen: state.menu.isOpen, links: state.menu.links, toggle: state.menu.toggle })))


  const lnks = [...links]

  const pathname = usePathname()

  const homeLink = lnks.shift();

  return (
    <section className={classNames(className, styles.container, {
      [styles.menu__opened]: isOpen
    })}>
      <nav>
        <NavHeader homeLink={homeLink} />
        <ul>
          {lnks.map(({ path, name, icon }, index) => {
            return (
              <li key={index} className={classNames({
                [styles.selected]: pathname === path
              })}>
                {icon && <ReactIcon className={styles.icon} name={icon} size={20} />}
                <span className={styles.name}>{name}</span>
                <Link href={path} aria-label={name} className={classNames(styles.link)}></Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <ToggleMenuButton onToggle={toggle} />
    </section>
  )
}

export default Component