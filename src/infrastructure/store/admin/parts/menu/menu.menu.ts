import { AdminStore, StateSetter } from "../..";
import BaseMenuStoreImplementation, { MenuStore } from "./base.menu";


export default class MenuStoreImplementation extends BaseMenuStoreImplementation implements MenuStore {

  constructor(set: StateSetter, initialState: Partial<MenuStore> = {}) {
    super(set, initialState)
  }

  public toggle: () => void = () => {
    this.set((state: AdminStore) => {
      const ns = { ...state }
      ns.menu.isOpen = !ns.menu.isOpen
      return ns
    })
  }


  public close: () => void = () => {
    this.set((state: AdminStore) => {
      const ns = { ...state }
      ns.menu.isOpen = false
      return ns
    })
  }

  public open: () => void = () => {
    this.set((state: AdminStore) => {
      const ns = { ...state }
      ns.menu.isOpen = true
      return ns
    })
  }
}


export const initialState: Partial<MenuStore> = {
  isOpen: true,
  /**
   * first item is used to `back-to-home` link
   **/
  links: [
    {
      path: "/admin",
      name: "Home"
    },
    {
      path: "/admin/security",
      icon: "fa6/FaHouseLock",
      name: "Security management"
    },
    {
      path: "/admin/cache",
      icon: "fa/FaMemory",
      name: "Cache management"
    }
  ]
}