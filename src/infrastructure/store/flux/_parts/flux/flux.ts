import MicroPostList from "@domain/microPostList"

export default class FluxStoreImplementation implements FluxStore {
  public loaded: boolean
  public model: MicroPostList

  constructor(private set: any, initialState: Partial<FluxStore> = {}) {
    this.loaded = false
    this.model = initialState.model || {
      posts: [],
      meta: {
        pagination: {
          total: 0,
          page: 0,
          pageSize: 0,
          pageCount: 0
        }
      }
    }
  }


  public setModel: (data: Partial<MicroPostList>) => void = (data) => {
    this.set((state: FluxStore) => {
      return { ...state, model: { ...state.model, ...data }, loaded: true }
    })
  }
}

export const initialState: Partial<FluxStore> = {
  loaded: false,
  model: {
    posts: [],
    meta: {
      pagination: {
        total: 0,
        page: 0,
        pageSize: 0,
        pageCount: 0
      }
    }
  },
}

export interface FluxStore {
  loaded: boolean,
  model: MicroPostList,
  setModel: (data: MicroPostList) => void,
}
