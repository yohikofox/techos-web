import classNames from "classnames"
import styles from "./clock.module.scss"

export interface IconProps {
  className?: string
}
export default function Icon({ className }: IconProps) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 490 490"
      xmlSpace="preserve"
      className={classNames(styles.container, className)}
    >
      <g>
        <g>
          <path d="M245,0C109.5,0,0,109.5,0,245s109.5,245,245,245s245-109.5,245-245S380.5,0,245,0z M245,449.3
			c-112.6,0-204.3-91.7-204.3-204.3S132.4,40.7,245,40.7S449.3,132.4,449.3,245S357.6,449.3,245,449.3z"/>
          <path d="M290.9,224.1h-25v-95.9c0-11.5-9.4-20.9-20.9-20.9s-20.9,9.4-20.9,20.9V245c0,11.5,9.4,20.9,20.9,20.9h45.9
			c11.5,0,20.9-9.4,20.9-20.9S302.3,224.1,290.9,224.1z"/>
        </g>
      </g>
    </svg>
  )
}