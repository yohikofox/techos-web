'use client'
import Search from "@domain/search";
import { Dispatch, SetStateAction, createContext, useState } from "react"

export const SearchDataContext = createContext<[Search, Dispatch<SetStateAction<Search>>] | null>(null);

export const SearchDataProvider = ({ children }: any) => {
  return (
    <SearchDataContext.Provider value={useState({} as Search)} >
      {children}
    </SearchDataContext.Provider>
  )
}
