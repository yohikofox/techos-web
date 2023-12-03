import { create } from 'zustand';
import MenuStoreImplementation, { MenuStore } from './parts/menu';

export interface AdminStore {
  menu: MenuStore
}

export type StateSetter = (partial: AdminStore | Partial<AdminStore> | ((state: AdminStore) => AdminStore | Partial<AdminStore>), replace?: boolean | undefined) => void

const useAdminStore = create<AdminStore>((set: StateSetter) => ({
  menu: new MenuStoreImplementation(set)
}));

export default useAdminStore


