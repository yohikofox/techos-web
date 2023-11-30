import { Inter, Roboto_Mono, Red_Hat_Display, Open_Sans, Roboto, Poppins, Gothic_A1, Ubuntu, JetBrains_Mono } from 'next/font/google'


export const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--inter' })
export const roboto = Roboto({ subsets: ['latin'], display: 'swap', variable: '--roboto', weight: ['400', '500', '700'] })
export const roboto_mono = Roboto_Mono({ subsets: ['latin'], display: 'swap', variable: '--roboto-mono' })
export const red_hat_display = Red_Hat_Display({ subsets: ['latin'], display: 'swap', variable: '--red-hat-display' });
export const open_sans = Open_Sans({ subsets: ['latin'], display: 'swap', variable: '--open-sans' });
export const poppins = Poppins({ subsets: ['latin'], display: 'swap', variable: '--poppins', weight: ['400', '500', '700'] });
export const gothicA1 = Gothic_A1({ subsets: ['latin'], display: 'swap', variable: '--gothica1', weight: ['400'] });
export const ubuntu = Ubuntu({ subsets: ['latin'], display: 'swap', variable: '--ubuntu', weight: ['400', '500', '700'] });
export const jetbrains_mono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--jetbrains-mono', weight: ['400', '500', '700'] });


const fonts = [
  inter,
  roboto,
  roboto_mono,
  red_hat_display,
  open_sans,
  poppins,
  gothicA1,
  ubuntu,
  jetbrains_mono
]

export default fonts