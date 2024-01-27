import Logo, { MainLogo } from "@/app/(main)/components/Icon/Logo";

import styles from "./logo.module.scss"
export default async function Page() {
  return (
    <>
      <Logo className={styles.container} />
      <MainLogo className={styles.container} />
    </>
  )
}