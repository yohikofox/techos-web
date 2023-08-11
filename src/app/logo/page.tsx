import Logo, { MainLogo } from "@/components/Icon/Logo";
import styles from "./logo.module.scss"
export default function Page() {
  return (
    <>
      <Logo className={styles.container} />
      <MainLogo className={styles.container} />
    </>
  )
}