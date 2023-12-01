
import styles from "./hamburger-menu.module.scss"
import dynamic from "next/dynamic"

const Hamburger = dynamic(() => import("@/app/(main)/components/Icon/Hamburger"), {
  suspense: true
})

export default function HamburgerMenu() {
  return (
    <>
      <Hamburger />
    </>
  )
}