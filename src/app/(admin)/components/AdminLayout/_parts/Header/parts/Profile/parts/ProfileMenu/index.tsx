'use client'

import styles from "./styles.module.scss"
import useAdminStore from "R/src/infrastructure/store/admin"
import classNames from "classnames"
import { MouseEventHandler, useEffect, useRef } from "react"

export default function Component() {
  const isOpen = useAdminStore(state => state.profileMenu.isOpen)

  return (
    <>
      {isOpen && <Menu />}
    </>
  )
}



const Menu = () => {
  const toggle = useAdminStore(state => state.profileMenu.toggle)

  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const clickHandler = (event: any) => {
      if (!menuRef.current?.contains(event.target)) {
        if (event.target.dataset.name === 'profile-menu-toggle') return
        toggle()
      }
    }

    document.addEventListener("mousedown", clickHandler)

    return () => {
      document.removeEventListener("mousedown", clickHandler)
    }
  }, [menuRef, toggle])

  const onLogout: MouseEventHandler<HTMLDivElement> = async (e) => {
    e.stopPropagation()
    window.location.href = "/api/auth/logout"
  }

  return (
    <div ref={menuRef} className={classNames(styles.profile__menu, {
      [styles.profile__menu__open]: true,
    })}>
      <div className={styles.profile__menu__item}>Profile</div>
      <div className={styles.profile__menu__item}>Settings</div>
      <div className={styles.profile__menu__item} onClick={onLogout}>Logout</div>
    </div>
  )
}