'use client'

import { useContext, useRef } from "react"
import styles from "./search.module.scss"
import { SearchDataContext } from "../context"
import SearchData from "@/business/model/searchData"

export interface SearchBarProps {
  placeholder: string
  delay?: boolean
}

const MIN_SEARCH_CHAR_LENGTH = 0

export default function SearchBar({ placeholder, delay }: SearchBarProps) {

  let currentTimeout = useRef<ReturnType<typeof setTimeout>>()

  const [_, setSearchResults] = useContext(SearchDataContext) || []

  const fetchResults = async (query: string) => {
    if (!query.length) {
      setSearchResults && setSearchResults({} as SearchData)
      return
    }

    if (query.length < MIN_SEARCH_CHAR_LENGTH) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/search?payload=${query}`)

      if (!response.ok) {
        console.error(
          `Error fetching search results for query ${query}`,
          response.statusText,
          response.status
        )
      }

      const results = await response.json()

      setSearchResults && setSearchResults(results)
    } catch (e) {
      console.error('SearchBar: ', e)
    }
  }


  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (delay) {
      if (currentTimeout.current) clearTimeout(currentTimeout.current)
      currentTimeout.current = setTimeout(async () => {
        fetchResults(e.target.value)
      }, 10)
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