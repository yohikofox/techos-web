'use client'

import useAdminStore from "R/src/infrastructure/store/admin"

export default function Component(data: {
  avatarFallback: string
}) {
  const avatarFallback = useAdminStore((state) => state.profileMenu.avatar.avatarFallback)

  avatarFallback(data.avatarFallback)

  return <></>
}