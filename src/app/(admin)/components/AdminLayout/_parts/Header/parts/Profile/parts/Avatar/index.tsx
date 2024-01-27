'use client'

import classNames from 'classnames';
import { useSession } from "next-auth/react";
import { Image } from "R/src/components/Image"
import useAdminStore from "R/src/infrastructure/store/admin";

import styles from "./styles.module.scss"

export default function Component({ className, fallback }: any) {
  const session = useSession()
  const avatarFallback = useAdminStore(state => state.profileMenu.avatar.fallback)

  // const seed = session.data?.user?.name || "default"
  // const fallback11 = `https://api.dicebear.com/7.x/adventurer-neutral/png?seed=${encodeURIComponent(seed)}&radius=50`
  // const fallback2 = `https://ui-avatars.com/api/?name=${encodeURIComponent(seed)}&rounded=true&font-size=.33&background=random&color=random`

  return (
    <>
      {session.data?.user?.image && <Image
        className={classNames(styles.image, className)}
        src={session.data?.user?.image}
        placeholder="blur"
        blurDataURL={avatarFallback}
        fill
        sizes={"33vw"}
        priority={false}
        alt={session.data?.user?.name || "Profile picture"}
      />}
    </>
  )
}