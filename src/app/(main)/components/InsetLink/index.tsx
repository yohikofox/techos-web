import classNames from "classnames";
import Link from "next/link";

import styles from "./styles.module.scss";

export interface InsetLinkProps {
  href: string;
  label: string;
  className?: string;
}

export default function Component({ href, label, className }: InsetLinkProps) {
  return (
    <>
      <Link
        href={href}
        aria-label={label}
        className={classNames(styles.inset__link, className)}
      />
    </>
  );
}
