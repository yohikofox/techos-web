import { create } from 'zustand';

export interface BlogStore {
  speech: {
    selectedSpeech?: string,
    selectASpeech: (id: string) => void,
  }
}

export type StateSetter = (partial: BlogStore | Partial<BlogStore> | ((state: BlogStore) => BlogStore | Partial<BlogStore>), replace?: boolean | undefined) => void

const useBlogStore = create<BlogStore>((set: StateSetter) => ({
  speech: {
    selectASpeech: (id: string) => set((state) => ({ ...state, speech: { ...state.speech, selectedSpeech: id } })),
  }
}));

export default useBlogStore
