import { AdminStore, StateSetter } from "../..";
import BaseMenuStoreImplementation, { MenuStore } from "./base.menu";

export type ProfileMenuStore = {
  avatar: {
    fallback?: string,
    avatarFallback: (fallback: string) => void
  }
} & MenuStore

export const initialState: Partial<MenuStore> = {
  isOpen: false,
  /**
   * first item is used to `back-to-home` link
   **/
  links: [
    {
      path: "/admin",
      icon: "",
      name: "Home"
    },
    {
      path: "/admin/security",
      name: "Security management"
    },
    {
      path: "/admin/cache",
      name: "Cache management"
    }
  ]
}

export default class ProfileMenuStoreImplementation extends BaseMenuStoreImplementation implements ProfileMenuStore {
  avatar: {
    fallback: undefined;
    avatarFallback: (fallback: string) => void;
  };

  constructor(set: StateSetter, initialState: Partial<MenuStore> = {}) {
    super(set, initialState)
    this.avatar = {
      fallback: undefined,
      avatarFallback: this.avatarFallback
    }
  }

  public toggle: () => void = () => {
    this.set((state: AdminStore) => {
      const ns = { ...state }
      ns.profileMenu.isOpen = !ns.profileMenu.isOpen
      return ns
    })
  }

  public close: () => void = () => {
    this.set((state: AdminStore) => {
      const ns = { ...state }
      ns.profileMenu.isOpen = false
      return ns
    })
  }

  public open: () => void = () => {
    this.set((state: AdminStore) => {
      const ns = { ...state }
      ns.profileMenu.isOpen = true
      return ns
    })
  }

  public avatarFallback: (fallback: string) => void = (fallback: string) => {
    this.set((state: AdminStore) => {
      const ns = { ...state }
      ns.profileMenu.avatar.fallback = fallback
      return ns
    })
  }
}
