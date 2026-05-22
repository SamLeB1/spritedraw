import { create } from "zustand";

type WindowState = {
  stack: string[];
  register: (id: string) => void;
  unregister: (id: string) => void;
  focus: (id: string) => void;
};

export const useWindowStore = create<WindowState>((set) => ({
  stack: [],
  register: (id) =>
    set((state) =>
      state.stack.includes(id) ? {} : { stack: [...state.stack, id] },
    ),
  unregister: (id) =>
    set((state) => ({ stack: state.stack.filter((s) => s !== id) })),
  focus: (id) =>
    set((state) => {
      if (state.stack[state.stack.length - 1] === id) return {};
      return { stack: [...state.stack.filter((s) => s !== id), id] };
    }),
}));
