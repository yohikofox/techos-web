import './globals.scss'
import type { Metadata } from 'next'
import classNames from 'classnames'
import styles from "./layout.module.scss"

import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import advancedFormat from 'dayjs/plugin/advancedFormat'

import fontBundle from '@/app/font'
import ServiceWorkerRegister from '@/app/(main)/components/ServiceWorkerRegister'
import Header from '@/app/(main)/components/Header'
import Footer from '@/app/(main)/components/Footer'
import Hero from '@/app/(main)/components/Hero'
// import CoreWebVitals from 'R/src/components/CoreWebVitals'

dayjs.locale('fr')
dayjs.extend(advancedFormat)

const defaultData = {
  title: 'Techos.Dev, tout pour la tech',
  description: 'www.techos.dev, tout pour la tech',
  manifest: '/manifest.json',
};

export const metadata: Metadata = defaultData;

const layout = function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="fr" className={
      classNames(styles.document, fontBundle.map(font => font.variable))}>
      <body className={classNames(styles.container)}>
        {/* <CoreWebVitals /> */}
        {/* <ServiceWorkerRegister /> */}
        <Header title={(metadata.title || defaultData.title).toString()} />
        <section className={styles.content}>
          {children}
        </section>
        {/* <Footer /> */}
      </body>
    </html>
  )
};

// layout.Hero = Hero;

export default layout;
