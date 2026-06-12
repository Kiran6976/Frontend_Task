import {
  ChevronRight,
  ChevronDown,
} from "lucide-react";

import AppSelector from "@/components/layout/AppSelector";
import { useAppStore } from "@/store/appStore";

export default function ApplicationPanel() {
  const isOpen = useAppStore(
    (state) => state.isApplicationPanelOpen
  );

  const togglePanel = useAppStore(
    (state) => state.toggleApplicationPanel
  );

  return (
    <div className="absolute left-4 top-4 z-20 max-w-[calc(100vw-2rem)] sm:left-5 sm:top-5">
      <div className="app-panel-card w-[400px] max-w-full overflow-hidden rounded-lg border border-zinc-800 bg-black/95 text-white shadow-2xl backdrop-blur">
        <button
          type="button"
          onClick={togglePanel}
          className="flex w-full cursor-pointer items-center justify-between border-b border-zinc-800 px-5 py-4 text-left transition hover:bg-zinc-950"
        >
          <div>
            <h2 className="text-xl font-semibold">
              Application
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
              Select an app to load its graph.
            </p>
          </div>

          {isOpen ? (
            <ChevronDown className="size-5 text-zinc-400" />
          ) : (
            <ChevronRight className="size-5 text-zinc-400" />
          )}
        </button>

        <div
          className={`
            overflow-hidden
            transition-all
            duration-300
            ${isOpen ? "max-h-[640px]" : "max-h-0"}
          `}
        >
          <div className="p-5">
            <AppSelector />
          </div>
        </div>
      </div>
    </div>
  );
}
