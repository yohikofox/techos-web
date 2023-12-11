import classNames from "classnames";

export interface CaretRightProps {
  className?: string
}

export default function CaretRight({ className }: CaretRightProps) {
  return (
    <svg className={classNames(className)} width="40" height="40" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <path d="M96,220a12,12,0,0,1-8.48535-20.48535L159.0293,128,87.51465,56.48535a12.0001,12.0001,0,0,1,16.9707-16.9707l80,80a12.00062,12.00062,0,0,1,0,16.9707l-80,80A11.96287,11.96287,0,0,1,96,220Z" />
    </svg>
  )
}