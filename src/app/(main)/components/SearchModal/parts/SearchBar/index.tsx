"use client";

import PostList from "R/src/domain/postList";
import { useContext, useRef } from "react";

import { SearchDataContext } from "../context";
import fetchResultsAction from "./fetchResults";
import styles from "./search.module.scss";

export interface SearchBarProps {
  placeholder: string;
  delay?: boolean;
}

const MIN_SEARCH_CHAR_LENGTH = 3;
const SEARCH_TRIGGER_DELAY = 400;

export default function SearchBar({ placeholder, delay }: SearchBarProps) {
  const currentTimeout = useRef<ReturnType<typeof setTimeout>>();

  const [_, setSearchResults] = useContext(SearchDataContext) || [];

  const fetchResults = async (query: string) => {
    if (query.length <= 0) {
      setSearchResults && setSearchResults({} as PostList);
      return;
    }

    const results = await fetchResultsAction(query);

    setSearchResults && results !== undefined && setSearchResults(results);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value?.length > 0 &&
      e.target.value?.length < MIN_SEARCH_CHAR_LENGTH
    )
      return;
    if (delay !== undefined && SEARCH_TRIGGER_DELAY > 0) {
      if (currentTimeout.current) clearTimeout(currentTimeout.current);
      currentTimeout.current = setTimeout(async () => {
        fetchResults(e.target.value);
      }, SEARCH_TRIGGER_DELAY);
    } else {
      fetchResults(e.target.value);
    }
  };

  return (
    <section className={styles.container}>
      <label htmlFor="default-search" className={styles.label}>
        Search
      </label>
      <input
        autoFocus
        name="default-search"
        type="search"
        onChange={handleSearch}
        placeholder={placeholder}
        className={styles.search__input}
      />
    </section>
  );
}
