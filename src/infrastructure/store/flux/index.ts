import { create } from 'zustand';
import FluxStoreImplementation, { FluxStore, initialState } from './_parts/flux/flux';

export type StateSetter = (partial: FluxStore | Partial<FluxStore> | ((state: FluxStore) => FluxStore | Partial<FluxStore>), replace?: boolean | undefined) => void

const useFluxStore = create<FluxStore>((set: StateSetter) => new FluxStoreImplementation(set, initialState));

export default useFluxStore
