'use client'
import CaretLeft from "@Admin/components/Icon/CaretLeft"
import styles from "./styles.module.scss"
import classNames from "classnames"
import { useState } from "react"

export interface ToggleMenuButtonProps {
  onToggle: () => void
}
export default function Component({ onToggle }: ToggleMenuButtonProps) {

  const [toggleState, setToggleState] = useState<boolean>(false)

  const onPrivateToggle = () => {
    onToggle()
    setToggleState(!toggleState)
  }

  return (
    <>
      <button className={styles.container} onClick={() => onPrivateToggle()}><CaretLeft className={classNames(styles.toggle__icon, {
        [styles["toggle__icon--open"]]: toggleState,
      })} /></button>
    </>
  )
}