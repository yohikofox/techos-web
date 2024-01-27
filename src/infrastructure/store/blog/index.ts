import { create } from 'zustand';

export enum QueryOperator {
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT',
  GREATER_THAN_OR_EQUAL = '>=',
  LESS_THAN_OR_EQUAL = '<=',
  GREATER_THAN = '>',
  LESS_THAN = '<',
}

export type QueryItem = {
  key: string,
  value: string
  operator: QueryOperator
}

export interface BlogStore {
  speech: {
    selectedSpeech?: string,
    selectASpeech: (id: string) => void,
  },
  search: {
    query: QueryItem[],
    setQuery: (queryItem: QueryItem) => void,
  }
}

export type StateSetter = (partial: BlogStore | Partial<BlogStore> | ((state: BlogStore) => BlogStore | Partial<BlogStore>), replace?: boolean | undefined) => void

const useBlogStore = create<BlogStore>((set: StateSetter) => ({
  speech: {
    selectASpeech: (id: string) => set((state) => ({ ...state, speech: { ...state.speech, selectedSpeech: id } })),
  },
  search: {
    query: [],
    setQuery: (queryItem: QueryItem) => set((state) => ({ ...state, search: { ...state.search, query: [...state.search.query, queryItem] } })),
  }
}));

export default useBlogStore
