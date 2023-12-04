'use client'

import { SessionProvider, useSession } from "next-auth/react"
import styles from "./styles.module.scss"
import classNames from "classnames"
import useAdminStore from "R/src/infrastructure/store/admin"
import { useShallow } from "zustand/react/shallow"
import { Image } from "R/src/components/Image"
import { useEffect, useRef } from "react"

/**
 * {
  "data": {
    "user": {
      "name": "yoann.lorho",
      "email": "yoann.lorho@gmail.com",
      "image": "https://lh3.googleusercontent.com/a/ACg8ocJb-i5U9xU36eOLCQb5OGfqbb3AAOFWGsqm7TVUfXdXX6A=s96-c"
    },
    "expires": "2024-01-03T01:36:03.436Z"
  },
  "status": "authenticated"
}
 */



function Component() {
  const session = useSession()
  const { isOpen, toggle } = useAdminStore(useShallow(state => ({ isOpen: state.profileMenu.isOpen, toggle: state.profileMenu.toggle })))


  function toggleClick(event: any): void {
    toggle()
  }


  return (
    <>
      <section className={styles.container} >
        <div className={styles.avatar}>
          {session.data?.user?.image && <Image
            className={styles.avatar__image}
            src={session.data?.user?.image}
            fill
            sizes={"33vw"}
            priority={false}
            alt={session.data?.user?.name || "Profile picture"}
          />}
          <span onClick={toggleClick} className={styles.inset__link} />
        </div>
        {isOpen && <ProfileMenu toggle={toggle} />}
      </section>
    </>
  )
}



const ProfileMenu = ({ toggle }: { toggle: () => void }) => {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const clickHandler = (event: any) => {
      if (!menuRef.current?.contains(event.target)) {
        console.log('click outside')
        toggle()
      }
    }

    document.addEventListener("mousedown", clickHandler)

    return () => {
      document.removeEventListener("mousedown", clickHandler)
    }
  }, [menuRef, toggle])

  return (
    <>
      <div ref={menuRef} className={classNames(styles.profile__menu, {
        [styles.profile__menu__open]: true,
      })}>
        <div className={styles.profile__menu__item}>Profile</div>
        <div className={styles.profile__menu__item}>Settings</div>
        <div className={styles.profile__menu__item}>Logout</div>
      </div>
    </>
  )
}

export default function Wrapper() {
  return (
    <SessionProvider>
      <Component />
    </SessionProvider>
  )
}