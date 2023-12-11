import { create } from 'zustand';
import { MenuStore } from './parts/menu/base.menu';
import MenuStoreImplementation, { initialState as menuInitialState } from './parts/menu/menu.menu';
import ProfileMenuStoreImplementation, { ProfileMenuStore, initialState as profileMenuInitialState } from './parts/menu/profileMenu.menu';
import CacheStoreImplementation, { CacheStore, initialState as cacheInitialState } from './parts/cache/cache';

export interface AdminStore {
  menu: MenuStore,
  profileMenu: ProfileMenuStore,
  cache: CacheStore,
}

export type StateSetter = (partial: AdminStore | Partial<AdminStore> | ((state: AdminStore) => AdminStore | Partial<AdminStore>), replace?: boolean | undefined) => void

const useAdminStore = create<AdminStore>((set: StateSetter) => ({
  menu: new MenuStoreImplementation(set, menuInitialState),
  profileMenu: new ProfileMenuStoreImplementation(set, profileMenuInitialState),
  cache: new CacheStoreImplementation(set, cacheInitialState),
}));

export default useAdminStore
