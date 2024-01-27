'use client'

import classNames from 'classnames'
import { useEffect, useState } from 'react'

import Range, { RangeProps } from '../Range'
import styles from './styles.module.scss'

export interface DoubleRangeProps extends RangeProps {
  renderResults?: (value: string[]) => string
}

export default function Component({ min, max, onChange, renderResults = (values: string[]) => values.join(','), step, value }: DoubleRangeProps) {
  const [minValue, setMinValue] = useState<number>(min)
  const [maxValue, setMaxValue] = useState<number>(max)

  useEffect(() => {
    (async function () {
      const result = renderResults([minValue.toString(), maxValue.toString()])
      onChange(result)
    })()
  }, [onChange, minValue, maxValue, renderResults])

  const onMinChange = (value: string) => {
    setMinValue(Number(value))
    onChange(value)
  }

  const onMaxChange = (value: string) => {
    setMaxValue(Number(value))
    onChange(value)
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.price__input__container}>
          <div className={styles.slider__container}>
            <div className={styles.price__slider} style={{
              left: `${(1 - (max - minValue) / (max - min)) * 100}%`,
              right: `${(((max - maxValue) / (max - min)) * 100)}%`
            }}>
            </div>
          </div>
        </div>
        <div className={classNames(styles.range__container)}>
          <Range min={min} max={max} value={minValue} onChange={onMinChange} className={classNames(styles.range, styles.min__range)} />
          <Range min={min} max={max} value={maxValue} onChange={onMaxChange} className={classNames(styles.range, styles.max__range)} />
        </div>
      </div>
    </>
  )
}