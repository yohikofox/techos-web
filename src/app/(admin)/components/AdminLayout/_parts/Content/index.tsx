import classNames from "classnames";
import { ComponentProps } from "@/app/(admin)/components/AdminLayout/_parts/ComponentProps";

export default function Component({ children, className }: ComponentProps) {
  return (
    <>
      <div className={classNames(className)}>
        <article>
          <h2>
            REUSABLE ARTICLE
          </h2>
        </article>
        <aside>ASIDE</aside>
        <details>
          <summary>Click me</summary>
          <p>Hidden content</p>
        </details>
        <section>
          {children}
        </section>
      </div>
    </>
  )
}