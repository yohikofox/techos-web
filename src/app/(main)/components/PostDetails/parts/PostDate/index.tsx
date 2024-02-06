import classNames from 'classnames';
import dayjs from "dayjs"

import styles from "./post-date.module.scss"

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