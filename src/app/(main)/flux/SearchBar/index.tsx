'use client'

import { useRef } from 'react';
import styles from "./styles.module.scss"
import useFluxStore from "R/src/infrastructure/store/flux"
import { initialState } from "R/src/infrastructure/store/flux/_parts/flux/flux"
import fetchResultsAction from "./fetchResultsAction"

export interface SearchBarProps {
  placeholder: string
  delay?: boolean
}

const MIN_SEARCH_CHAR_LENGTH = 3
const SEARCH_TRIGGER_DELAY = 300

export default function SearchBar({ placeholder, delay }: SearchBarProps) {

  let currentTimeout = useRef<ReturnType<typeof setTimeout>>()

  const setModel = useFluxStore(state => state.setModel)

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fetchResults = async (query: string) => {
      if (!query.length) {
        query = ''
        // setModel && setModel(initialState.model!)
        // return
      }

      const results = await fetchResultsAction(query);

      setModel({ posts: results.hits } as any)
    }

    if (e.target.value?.length > 0 && e.target.value?.length < MIN_SEARCH_CHAR_LENGTH) return
    if (delay && SEARCH_TRIGGER_DELAY > 0) {
      if (currentTimeout.current) clearTimeout(currentTimeout.current)
      currentTimeout.current = setTimeout(async () => {
        await fetchResults(e.target.value)
      }, SEARCH_TRIGGER_DELAY)
    } else {
      await fetchResults(e.target.value)
    }
  }

  return (
    <section className={styles.container}>
      <label htmlFor="default-search" className={styles.label}>Search</label>
      <input autoFocus name="default-search" type="search" onChange={handleSearch} placeholder={placeholder} className={styles.search__input} />
    </section>
  )
}