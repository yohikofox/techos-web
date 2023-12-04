import BaseMenuStoreImplementation, { MenuStore } from "./base.menu";


export default class MenuStoreImplementation extends BaseMenuStoreImplementation implements MenuStore {

  constructor(set: any, initialState: Partial<MenuStore> = {}) {
    super(set, initialState)
  }

  public toggle: () => void = () => {
    this.set((state: any) => {
      const ns = { ...state }
      ns.menu.isOpen = !ns.menu.isOpen
      return ns
    })
  }
}
