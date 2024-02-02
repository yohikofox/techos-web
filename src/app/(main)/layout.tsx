import "./globals.scss";
import "dayjs/locale/fr";

import classNames from "classnames";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import type { Metadata } from "next";

import Hero from "@/app/(main)/components/Hero";
import ServiceWorkerRegister from "@/app/(main)/components/ServiceWorkerRegister";
import fontBundle from "@/app/font";

import Header from "./components/Header";
import styles from "./layout.module.scss";
// import CoreWebVitals from 'R/src/components/CoreWebVitals'

dayjs.locale("fr");
dayjs.extend(advancedFormat);

const defaultData = {
  title: "Techos.Dev, tout pour la tech",
  description: "www.techos.dev, tout pour la tech",
  manifest: "/manifest.json",
};

export const metadata: Metadata = defaultData;

const layout = function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={classNames(
        styles.document,
        fontBundle.map((font) => font.variable)
      )}
    >
      <body className={classNames(styles.container)}>
        {/* <CoreWebVitals /> */}
        <ServiceWorkerRegister />
        <Header />
        <section className={styles.content}>{children}</section>
        {/* <Footer /> */}
      </body>
    </html>
  );
};

layout.Hero = Hero;

export default layout;

// title={(metadata.title !== null && metadata.title !== undefined
//           ? metadata.title
//           : defaultData.title
//         ).toString()}
