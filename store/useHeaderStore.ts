import { create } from "zustand";

interface HeaderState {
  mounted: boolean;
  scrolled: boolean;
  searchOpen: boolean;
  theme: string;
  setMounted: (mounted: boolean) => void;
  setScrolled: (scrolled: boolean) => void;
  setSearchOpen: (searchOpen: boolean) => void;
  setTheme: (theme: string) => void;
}

export const useHeaderStore = create<HeaderState>((set) => ({
  mounted: false,
  scrolled: false,
  searchOpen: false,
  theme: "system",
  setMounted: (mounted) => set({ mounted }),
  setScrolled: (scrolled) => set({ scrolled }),
  setSearchOpen: (searchOpen) => set({ searchOpen }),
  setTheme: (theme) => set({ theme }),
}));
