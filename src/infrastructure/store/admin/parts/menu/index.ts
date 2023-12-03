export type MenuStore = {
  isOpen: boolean,
  toggle: () => void
}

export default class MenuStoreImplementation implements MenuStore {
  public isOpen: boolean = false

  constructor(private set: any) { }

  toggle: () => void = () => {
    this.set((state: any) => {
      const ns = { ...state }
      ns.menu.isOpen = !ns.menu.isOpen
      return ns
    })
  }
}
