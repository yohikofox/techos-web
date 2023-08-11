'use client'
import { MouseEventHandler, useState } from "react";
import styles from "./search-modal.module.scss"
import Search from "../Icon/Search";
import Modal from "./parts/Modal";
import SearchResults from "./parts/SearchResults";
import { SearchDataProvider } from "./parts/context";
import classNames from "classnames";

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
      <button className={classNames(styles.container, className)} onClick={handleClick}>
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