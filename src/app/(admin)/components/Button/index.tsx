'use client';

import { MouseEventHandler, PropsWithChildren, useState } from "react";
import styles from "./styles.module.scss";
import Spinner from "../Icon/ReactIcon/Spinner";
import classNames from "classnames";

export interface ButtonProps extends PropsWithChildren<{}> {
  onClick: () => Promise<void>
}

export default function Component({ children, onClick }: ButtonProps) {
  const [loading, setLoading] = useState<boolean>(false)

  const privateOnClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault()
    setLoading(true)
    await onClick()
    setLoading(false)
  }
  return (
    <button className={styles.container} onClick={privateOnClick}>{children}<span><Spinner className={classNames(styles.loader, {
      [styles.loading]: loading,
      [styles["not-loading"]]: !loading,
    })} /></span></button>
  )
}