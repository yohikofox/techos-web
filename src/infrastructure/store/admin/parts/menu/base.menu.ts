export default abstract class BaseMenuStoreImplementation implements MenuStore {
  public isOpen: boolean
  public links: MenuItem[]

  constructor(protected set: any, initialState: Partial<MenuStore> = {}) {
    this.isOpen = initialState.isOpen === undefined || initialState.isOpen === null ? true : initialState.isOpen;
    this.links = initialState.links || [];
  }

  abstract toggle: () => void;
}

export type MenuItem = {
  name: string,
  path: string,
  icon?: string,
  subMenu?: MenuItem[]
}

export type MenuStore = {
  isOpen: boolean,
  links: MenuItem[]
  toggle: () => void
}