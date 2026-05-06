import { create } from "zustand";
import { platforms as initialPlatforms } from "@/data/mock";

export const useDashboardStore = create((set) => ({
  platforms: initialPlatforms,
  togglePlatform: (id) =>
    set((s) => ({ platforms: s.platforms.map((p) => (p.id === id ? { ...p, visible: !p.visible } : p)) })),
  selectedSubjectId: null,
  setSelectedSubject: (id) => set({ selectedSubjectId: id, simulatorOpen: id !== null }),
  simulatorOpen: false,
  setSimulatorOpen: (v) => set({ simulatorOpen: v }),
}));