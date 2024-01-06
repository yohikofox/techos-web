'use client';

import { MouseEventHandler, PropsWithChildren } from "react";
import styles from "./styles.module.scss";

export interface ButtonProps extends PropsWithChildren<{}> {
  onClick: () => void
}

export default function Component({ children, onClick }: ButtonProps) {
  const privateOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    onClick()
  }
  return (
    <button className={styles.container} onClick={privateOnClick}>{children}</button>
  )
}