import BaseMenuStoreImplementation, { MenuStore } from "./base.menu";

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

export default class ProfileMenuStoreImplementation extends BaseMenuStoreImplementation implements MenuStore {

  constructor(set: any, initialState: Partial<MenuStore> = {}) {
    super(set, initialState)
  }

  public toggle: () => void = () => {
    this.set((state: any) => {
      const ns = { ...state }
      ns.profileMenu.isOpen = !ns.profileMenu.isOpen
      return ns
    })
  }
}
