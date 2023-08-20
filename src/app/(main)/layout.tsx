import './globals.scss'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import classNames from 'classnames'
import styles from "./layout.module.scss"
import { Roboto, Poppins, Ubuntu } from 'next/font/google'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'

import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister'

dayjs.locale('fr')
dayjs.extend(advancedFormat)

const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] })
const poppins = Poppins({ weight: ['400', '500', '700'], subsets: ['latin'] })
const ubuntu = Ubuntu({ weight: ['400', '500', '700'], subsets: ['latin'] })

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
    <html lang="fr" className={styles.document}>
      <body className={classNames(ubuntu.className, styles.container)}>
        {/* <ServiceWorkerRegister /> */}
        {/* <Header title={(metadata.title || defaultData.title).toString()} /> */}
        <section className={styles.content}>
          {children}
        </section>
        {/* <Footer /> */}
      </body>
    </html>
  )
};

layout.Hero = Hero;

export default layout;
