import { ComponentProps } from "@Admin/components/AdminLayout/_parts/ComponentProps";
import classNames from "classnames";
import { ImSpinner3 } from "react-icons/im";
import styles from './styles.module.scss';


export default function Component({ className, ...props }: ComponentProps) {
  return (
    <ImSpinner3 className={classNames(styles.spinner, className)} {...props} />
  )
}