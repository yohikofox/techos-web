import classNames from 'classnames'
import styles from './tracking.module.scss'

export interface DisplayTrackingProps {
  counter: number
  title?: string
  className?: string
}

export default function DisplayTracking({ title, counter, className }: DisplayTrackingProps) {
  // (title && counter > 1)
  return (
    <>
      {
        true && <div className={classNames(styles.container, className)}>
          <h3><span> {`${title} ${counter < 1000 ? counter : `${Math.ceil(counter / 1000)}K`}`}</span></h3>
        </div>
      }
    </>
  )
}