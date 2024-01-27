import { create } from 'zustand';

import CacheStoreImplementation, { CacheStore, initialState as cacheInitialState } from './parts/cache/cache';
import { MenuStore } from './parts/menu/base.menu';
import MenuStoreImplementation, { initialState as menuInitialState } from './parts/menu/menu.menu';
import ProfileMenuStoreImplementation, { initialState as profileMenuInitialState,ProfileMenuStore } from './parts/menu/profileMenu.menu';

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
