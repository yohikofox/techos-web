import "./global.scss"
import styles from "./styles.module.scss"

import { PropsWithChildren } from "react"

export const metadata = {
  title: 'All i want for christmas',
  description: 'All i want for christmas',
}

export default function RootLayout({ children, ...props }: PropsWithChildren) {
  return (
    <html lang="fr">
      <body>
        <main>
          <section className={styles.container}>
            <section className={styles.content}>
              {children}
            </section>
          </section>
        </main>
      </body>
    </html>
  )
}
