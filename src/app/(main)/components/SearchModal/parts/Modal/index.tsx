'use client'

import { ReactNode, useContext, useEffect } from "react"
import Close from "@/app/(main)/components/Icon/Close"
import SearchBar from "../SearchBar"
import styles from "./modal.module.scss"
import { SearchDataContext } from "../context"
import Search from "@/business/model/search"

export interface ModalProps {
  title?: string
  placeholder?: string
  children?: ReactNode;
  closeHandler?: (value: boolean) => void
}

export default function Modal({ title, placeholder, children, closeHandler }: ModalProps) {

  const [_, setSearchResults] = useContext(SearchDataContext) || []

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    };
  }, [])

  const handleCloseClick = () => {
    setSearchResults && setSearchResults({} as Search)
    closeHandler && closeHandler(false)
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <header>
          <h1>{title}</h1>
          <section><Close className={styles.close} onClick={handleCloseClick} /></section>
        </header>
        <section className={styles.content}>
          <div className={styles.search__bar}>
            <SearchBar placeholder={placeholder || ""} delay={true} />
          </div>
          <section className={styles.children}>
            {children}
          </section>
        </section>
      </main>
    </div>
  )
}