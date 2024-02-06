import { create, StoreApi, UseBoundStore } from "zustand";

import FluxStoreImplementation, {
  FluxStore,
  initialState,
} from "./_parts/flux/flux";

export type StateSetter = (
  partial:
    | FluxStore
    | Partial<FluxStore>
    | ((state: FluxStore) => FluxStore | Partial<FluxStore>),
  replace?: boolean | undefined
) => void;

const useFluxStore = create<FluxStore>(
  (set: StateSetter) => new FluxStoreImplementation(set, initialState)
);

class ZustandFactory {
  private static _instance: UseBoundStore<StoreApi<FluxStore>> | undefined =
    undefined;
  public static getInstance: (
    initialData?: Partial<FluxStore>
  ) => UseBoundStore<StoreApi<FluxStore>> = (initialData) => {
    if (
      this._instance === undefined ||
      this._instance.getState().loaded === false
    )
      this._instance = create<FluxStore>(
        (set: StateSetter) =>
          new FluxStoreImplementation(set, {
            ...initialState,
            ...initialData,
            loaded: initialData !== undefined,
          })
      );
    return this._instance;
  };
}

export default ZustandFactory.getInstance;
export { useFluxStore };
