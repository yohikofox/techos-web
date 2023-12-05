import { create } from 'zustand';
import menuInitialState from './parts/menu/menu.initialState';
import { MenuStore } from './parts/menu/base.menu';
import MenuStoreImplementation from './parts/menu/menu.menu';
import ProfileMenuStoreImplementation, { ProfileMenuStore, initialState as profileMenuInitialState } from './parts/menu/profileMenu.menu';

export interface AdminStore {
  menu: MenuStore,
  profileMenu: ProfileMenuStore,
}

export type StateSetter = (partial: AdminStore | Partial<AdminStore> | ((state: AdminStore) => AdminStore | Partial<AdminStore>), replace?: boolean | undefined) => void

const useAdminStore = create<AdminStore>((set: StateSetter) => ({
  menu: new MenuStoreImplementation(set, menuInitialState),
  profileMenu: new ProfileMenuStoreImplementation(set, profileMenuInitialState),
}));

export default useAdminStore


