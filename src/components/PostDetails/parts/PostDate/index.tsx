import dayjs from "dayjs"
import styles from "./post-date.module.scss"
import classNames from 'classnames';

export interface PostDateProps {
  date: string
  className?: string
}
export default function PostDate({ date, className }: PostDateProps) {
  return (
    <>
      <span className={classNames(styles.container, className)}>
        {dayjs(date).format('DD MMMM, YYYY')}
      </span>
    </>
  )
}