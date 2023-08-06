'use client'
import SearchData from "@/business/model/searchData";
import { Dispatch, SetStateAction, createContext, useState } from "react"

export const SearchDataContext = createContext<[SearchData, Dispatch<SetStateAction<SearchData>>] | null>(null);

export const SearchDataProvider = ({ children }: any) => {
  return (
    <SearchDataContext.Provider value={useState({} as SearchData)} >
      {children}
    </SearchDataContext.Provider>
  )
}
