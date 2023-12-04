import CaretLeft from "@Admin/components/Icon/CaretLeft"
import styles from "./styles.module.scss"

export interface ToggleMenuButtonProps {
  onToggle: () => void
}
export default function Component({ onToggle }: ToggleMenuButtonProps) {
  return (
    <>
      <button className={styles.container} onClick={() => onToggle()}><CaretLeft className={styles.toggle__icon} /></button>
    </>
  )
}