"use client";

import classNames from "classnames";
import InsetLink from "R/src/app/(main)/components/InsetLink";
import useAdminStore from "R/src/infrastructure/store/admin";

import Logo from "../Logo";
import styles from "./style.module.scss";

export interface NavHeaderProps {
  homeLink?: { path: string; name: string };
}

export default function Component({ homeLink }: NavHeaderProps) {
  const isOpen = useAdminStore((state) => state.menu.isOpen);

  return (
    <>
      <section
        className={classNames(styles.container, {
          [styles.menu__opened]: isOpen,
        })}
      >
        <Logo />
        {homeLink && <InsetLink href={homeLink.path} label={"go to home"} />}
      </section>
    </>
  );
}
