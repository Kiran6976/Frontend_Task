import { create } from "zustand";

interface AppStore {
  selectedAppId: string | null;
  selectedNodeId: string | null;

  isMobilePanelOpen: boolean;

  isApplicationPanelOpen: boolean;

  activeInspectorTab: string;
  fitViewRequest: number;
  isDarkMode: boolean;

  setSelectedAppId: (id: string) => void;
  setSelectedNodeId: (id: string | null) => void;

  setMobilePanelOpen: (open: boolean) => void;

  setActiveInspectorTab: (tab: string) => void;
  requestFitView: () => void;
  toggleTheme: () => void;

  toggleApplicationPanel: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  selectedAppId: null,

  selectedNodeId: null,

  isMobilePanelOpen: false,

  isApplicationPanelOpen: true,

  activeInspectorTab: "config",
  fitViewRequest: 0,
  isDarkMode: true,

  setSelectedAppId: (id) =>
    set({
      selectedAppId: id,
      selectedNodeId: null,
    }),

  setSelectedNodeId: (id) =>
    set({ selectedNodeId: id }),

  setMobilePanelOpen: (open) =>
    set({ isMobilePanelOpen: open }),

  setActiveInspectorTab: (tab) =>
    set({ activeInspectorTab: tab }),

  requestFitView: () =>
    set((state) => ({
      fitViewRequest:
        state.fitViewRequest + 1,
    })),

  toggleTheme: () =>
    set((state) => ({
      isDarkMode: !state.isDarkMode,
    })),

  toggleApplicationPanel: () =>
    set((state) => ({
      isApplicationPanelOpen:
        !state.isApplicationPanelOpen,
    })),
}));
