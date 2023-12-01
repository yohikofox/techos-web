'use client'

import { useReportWebVitals } from 'next/web-vitals'

export default function CoreWebVitals() {

  useReportWebVitals((metric) => {
    const color = `color: #bada55`
    let picto = ''

    switch (metric.rating) {
      case 'good':
        picto = '✅'
        break
      case 'poor':
        picto = '⚠️'
        break
      case 'nicetohave':
        picto = '🤷‍♂️'
        break
      case 'needsimprovement':
        picto = '🤔'
        break
      case 'fail':
        picto = '❌'
        break
    }

    const text_style = `font-size: 16px;font-weight: 700;`
    process.env.NODE_ENV === "development" && console.log(`%c ${metric.name}: 	%c ${picto}`, text_style, text_style + color)
  })

  return (
    <>
    </>
  )
}