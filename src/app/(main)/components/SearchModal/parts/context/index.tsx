"use client";
import PostList from "R/src/domain/postList";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

export const SearchDataContext = createContext<
  [PostList, Dispatch<SetStateAction<PostList>>] | null
>(null);

export const SearchDataProvider = ({ children }: PropsWithChildren) => {
  return (
    <SearchDataContext.Provider value={useState({} as PostList)}>
      {children}
    </SearchDataContext.Provider>
  );
};
