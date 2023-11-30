import { ComponentProps } from "@/components/admin/AdminLayout/_parts/ComponentProps";
import classNames from "classnames";

export default function Component({ className }: ComponentProps) {
  return (
    <footer className={classNames(className)}>
      FOOTER
    </footer>
  )
}