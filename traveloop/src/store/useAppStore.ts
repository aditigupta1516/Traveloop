// src/store/useAppStore.ts
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface AppState {
  // UI State
  sidebarOpen: boolean;
  commandPaletteOpen: boolean;
  theme: "dark" | "light";
  
  // Notifications
  unreadCount: number;
  
  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  setTheme: (theme: "dark" | "light") => void;
  setUnreadCount: (count: number) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        sidebarOpen: true,
        commandPaletteOpen: false,
        theme: "dark",
        unreadCount: 0,

        toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
        setSidebarOpen: (open) => set({ sidebarOpen: open }),
        toggleCommandPalette: () => set((s) => ({ commandPaletteOpen: !s.commandPaletteOpen })),
        setTheme: (theme) => set({ theme }),
        setUnreadCount: (count) => set({ unreadCount: count }),
      }),
      { name: "traveloop-app-store", partialize: (s) => ({ theme: s.theme, sidebarOpen: s.sidebarOpen }) }
    ),
    { name: "AppStore" }
  )
);

// src/store/useTripStore.ts
interface TripState {
  activeTrip: string | null;
  activeTripTab: string;
  mapVisible: boolean;
  
  setActiveTrip: (id: string | null) => void;
  setActiveTripTab: (tab: string) => void;
  toggleMap: () => void;
}

export const useTripStore = create<TripState>()(
  devtools(
    (set) => ({
      activeTrip: null,
      activeTripTab: "itinerary",
      mapVisible: false,

      setActiveTrip: (id) => set({ activeTrip: id }),
      setActiveTripTab: (tab) => set({ activeTripTab: tab }),
      toggleMap: () => set((s) => ({ mapVisible: !s.mapVisible })),
    }),
    { name: "TripStore" }
  )
);
