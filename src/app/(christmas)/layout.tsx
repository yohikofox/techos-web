import "./global.scss";

import { PropsWithChildren } from "react";

import styles from "./styles.module.scss";

export const metadata = {
  title: "All i want for christmas",
  description: "All i want for christmas",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="fr">
      <body>
        <main>
          <section className={styles.container}>
            <section className={styles.content}>{children}</section>
          </section>
        </main>
      </body>
    </html>
  );
}
