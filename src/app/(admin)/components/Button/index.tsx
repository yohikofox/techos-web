'use client';

import { MouseEventHandler, PropsWithChildren, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Spinner from "../Icon/ReactIcon/Spinner";
import classNames from "classnames";
import toast from "../../hooks/useToaster";

export interface ButtonProps extends PropsWithChildren<{}> {
  onClick: () => Promise<any>
}

export default function Component({ children, onClick }: ButtonProps) {
  const [loading, setLoading] = useState<boolean>(false)

  const privateOnClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault()
    let id;
    try {
      setLoading(true)
      id = toast.loading("Working ...", {
        duration: 300000
      })

      const response = await onClick()

      if (response?.ok) {
        toast.success("Done", {
          id,
          duration: 3000
        })
      } else {
        toast.error(response.message, {
          id,
          duration: 3000
        })
      }


      setLoading(false)
    } catch (error: any) {
      toast.error(error?.message, {
        id,
        duration: 3000
      })
      setLoading(false)
    }
  }
  return (
    <button className={styles.container} onClick={privateOnClick}>{children}<span><Spinner className={classNames(styles.loader, {
      [styles.loading]: loading,
      [styles["not-loading"]]: !loading,
    })} /></span></button>
  )
}