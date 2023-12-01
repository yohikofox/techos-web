import classNames from "classnames";
import { ComponentProps } from "@/app/(admin)/components/AdminLayout/_parts/ComponentProps";

export default function Component({ className }: ComponentProps) {
  return (
    <section className={classNames(className)}>
      <nav>
        <ul>
          <li><a href="#">LINK 1</a></li>
          <li><a href="#">LINK 2</a></li>
          <li><a href="#">LINK 3</a></li>
          <li><a href="#">LINK 4</a></li>
        </ul>
      </nav>
    </section>
  )
}