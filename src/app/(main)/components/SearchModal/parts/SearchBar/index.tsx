'use client'

import { useContext, useRef } from "react"
import styles from "./search.module.scss"
import { SearchDataContext } from "../context"
import SearchData from "@/business/model/searchData"
import fetchResultsAction from "./fetchResults"

export interface SearchBarProps {
  placeholder: string
  delay?: boolean
}

const MIN_SEARCH_CHAR_LENGTH = 3
const SEARCH_TRIGGER_DELAY = 400

export default function SearchBar({ placeholder, delay }: SearchBarProps) {

  let currentTimeout = useRef<ReturnType<typeof setTimeout>>()

  const [_, setSearchResults] = useContext(SearchDataContext) || []

  const fetchResults = async (query: string) => {
    if (!query.length) {
      setSearchResults && setSearchResults({} as SearchData)
      return
    }

    const results = await fetchResultsAction(query);

    (setSearchResults && results) && setSearchResults(results)
  }

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value?.length > 0 && e.target.value?.length < MIN_SEARCH_CHAR_LENGTH) return
    if (delay || SEARCH_TRIGGER_DELAY > 0) {
      if (currentTimeout.current) clearTimeout(currentTimeout.current)
      currentTimeout.current = setTimeout(async () => {
        fetchResults(e.target.value)
      }, SEARCH_TRIGGER_DELAY)
    } else {
      fetchResults(e.target.value)
    }
  }

  return (
    <section className={styles.container}>
      <label htmlFor="default-search" className={styles.label}>Search</label>
      <input autoFocus name="default-search" type="search" onChange={handleSearch} placeholder={placeholder} className={styles.search__input} />
    </section>
  )
}