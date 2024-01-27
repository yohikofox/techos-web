'use client'
import classNames from "classnames";
import { MouseEventHandler, useState } from "react";

import Search from "../Icon/Search";
import { SearchDataProvider } from "./parts/context";
import Modal from "./parts/Modal";
import SearchResults from "./parts/SearchResults";
import styles from "./search-modal.module.scss"

export interface SearchModalProps {
  placeholder?: string
  title?: string
  className?: string
}

export default function SearchModal({ placeholder, title, className }: SearchModalProps) {
  const [showModal, setShowModal] = useState(false)

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    setShowModal(!showModal)
  }
  return (
    <SearchDataProvider>
      <button aria-label="search-modal" className={classNames(styles.container, className)} onClick={handleClick}>
        <Search className={styles.icon} />
      </button>
      {showModal && <Modal
        placeholder={placeholder}
        closeHandler={setShowModal}
        title={title}
      >
        <SearchResults handleSelectedItem={setShowModal} />
      </Modal>}
    </SearchDataProvider>
  )
}