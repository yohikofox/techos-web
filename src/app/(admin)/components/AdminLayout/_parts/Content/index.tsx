import { ComponentProps } from "@/components/admin/AdminLayout/_parts/ComponentProps";
import classNames from "classnames";

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