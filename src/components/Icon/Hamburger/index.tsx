import styles from "./hamburger.module.scss"

export default function Hamburger() {
  return (
    <svg className={styles.container} width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 12H21" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 6H21" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 18H21" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}