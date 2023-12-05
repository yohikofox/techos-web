import { MenuStore } from "./base.menu"

const initialState: Partial<MenuStore> = {
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

export default initialState