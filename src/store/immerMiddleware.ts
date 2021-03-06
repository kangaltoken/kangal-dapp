import { State, StateCreator } from "zustand";
import produce, { Draft } from "immer";

const immerMiddleware =
  <T extends State>(
    config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>
  ): StateCreator<T> =>
  (set, get, api) =>
    config((fn) => set(produce<T>(fn)), get, api);

export default immerMiddleware;
