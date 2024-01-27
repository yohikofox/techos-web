'use client'
import { FacetedSearch } from '@domain/search'
import { QueryOperator } from '@infra/store/blog/index';
import dayjs from 'dayjs'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'querystring'
import { useState } from 'react'

import DoubleRange from './_parts/DoubleRange'
import styles from './styles.module.scss'

export interface RangedFacetProps {
  facet: FacetedSearch,
  renderLabel?: (value: number) => React.ReactNode,
  renderResults?: (value: string[]) => string
}

export default function Component({ facet, renderResults = (values: string[]) => values.join(','), renderLabel = (value: number) => value }: RangedFacetProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [currentValue, setCurrentValue] = useState<number | undefined>(undefined)

  const onChange = (value: string) => {
    console.debug("🚀 ~ onChange ~ value:", value)
    setCurrentValue(Number(value))

    const seed: Record<string, string[]> = {}
    const query = [...searchParams.entries()].reduce((acc, [k, v]) => {

      if (k === facet.name) {
        const current = acc[k] || []
        current.push(v)
        acc[k] = current
        return acc
      }

      return acc
    }, seed)

    query[facet.name] = [value]

    const newQs = qs.stringify(query)


    // router.push(`/posts/1?${newQs}`)
  }



  return (
    <div className={styles.container}>
      <h4>{facet.name}</h4>
      <div className={styles.item}>
        {/* <span>{renderLabel(facet.min!)}</span> */}
        <DoubleRange
          min={facet.min!} max={facet.max!}
          onChange={onChange} value={currentValue}
          renderResults={renderResults}
        />
        {/* <span>{renderLabel(facet.max!)}</span> */}
      </div>
      {/* <div className={styles.current__value}>
        {currentValue && renderLabel(currentValue)}
      </div> */}
    </div>
  )
}


export function ServerComponent(props: RangedFacetProps) {
  let renderLabel = (value: number): string => value.toString()
  let renderResults = (values: string[]) => values.join(',')

  switch (props.facet.dataType) {
    case 'date':
      renderLabel = (value: number) => dayjs(value).format('DD/MM/YYYY')
      renderResults = (values: string[]) => {
        const [min, max] = values

        const render = (value: string, operator: QueryOperator) => `${props.facet.name} ${operator} ${dayjs(Number(value)).toISOString()}`

        const toto = [
          render(min, QueryOperator.GREATER_THAN_OR_EQUAL),
          render(max, QueryOperator.LESS_THAN)
        ].join(' AND ')

        console.log("🚀 ~ ServerComponent ~ toto:", toto)
        return toto
      }
      break;
    default: break;
  }
  return (
    <Component {...props} renderLabel={renderLabel} renderResults={renderResults} />
  )
}