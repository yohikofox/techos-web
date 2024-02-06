"use client";

import classNames from "classnames";
import { MouseEventHandler, PropsWithChildren, useState } from "react";

import toast from "../../hooks/useToaster";
import Spinner from "../Icon/ReactIcon/Spinner";
import styles from "./styles.module.scss";

export interface ButtonProps extends PropsWithChildren {
  onClick: () => Promise<{
    success: boolean;
    message?: string;
  }>;
}

export default function Component({ children, onClick }: ButtonProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const privateOnClick: MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    let id;
    try {
      setLoading(true);
      id = toast.loading("Working ...", {
        duration: 300000,
      });

      const response = await onClick();

      if (response.success === true) {
        toast.success("Done", {
          id,
          duration: 3000,
        });
      } else {
        toast.error(response.message, {
          id,
          duration: 3000,
        });
      }

      setLoading(false);
    } catch (error: unknown) {
      toast.error((error as { message: string })?.message, {
        id,
        duration: 3000,
      });
      setLoading(false);
    }
  };
  return (
    <button className={styles.container} onClick={privateOnClick}>
      {children}
      <span>
        <Spinner
          className={classNames(styles.loader, {
            [styles.loading]: loading,
            [styles["not-loading"]]: !loading,
          })}
        />
      </span>
    </button>
  );
}
