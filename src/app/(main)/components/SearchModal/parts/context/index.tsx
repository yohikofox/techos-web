"use client";
import Search from "@domain/search";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

export const SearchDataContext = createContext<
  [Search, Dispatch<SetStateAction<Search>>] | null
>(null);

export const SearchDataProvider = ({ children }: PropsWithChildren) => {
  return (
    <SearchDataContext.Provider value={useState({} as Search)}>
      {children}
    </SearchDataContext.Provider>
  );
};
