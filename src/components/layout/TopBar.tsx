import {
  Maximize2,
  Moon,
  PanelRightOpen,
  Plus,
  Share2,
  Sun,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/appStore";
import { useGraphStore } from "@/store/graphStore";

export default function TopBar() {
  const requestFitView = useAppStore(
    (state) => state.requestFitView
  );

  const isDarkMode = useAppStore(
    (state) => state.isDarkMode
  );

  const toggleTheme = useAppStore(
    (state) => state.toggleTheme
  );

  const setMobilePanelOpen = useAppStore(
    (state) => state.setMobilePanelOpen
  );

  const setSelectedNodeId = useAppStore(
    (state) => state.setSelectedNodeId
  );

  const addServiceNode = useGraphStore(
    (state) => state.addServiceNode
  );

  const handleAddNode = () => {
    const nodeId = addServiceNode();

    setSelectedNodeId(nodeId);
    requestFitView();
  };

  return (
    <header className="app-topbar flex h-16 items-center justify-between border-b border-zinc-800 bg-[#030304] px-3 text-white sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-zinc-700 bg-white text-black shadow-sm">
          <span className="text-xl font-black">
            A
          </span>
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold sm:text-base">
            App Graph Builder
          </h1>
          <p className="hidden text-xs text-zinc-500 sm:block">
            ReactFlow service topology
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="topbar-action border-zinc-800 bg-[#101114] text-white hover:bg-zinc-900"
          onClick={requestFitView}
          aria-label="Fit view"
          title="Fit view"
        >
          <Maximize2 />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="topbar-action border-zinc-800 bg-[#101114] text-white hover:bg-zinc-900"
          aria-label="Share graph"
          title="Share graph"
        >
          <Share2 />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="topbar-action border-zinc-800 bg-[#101114] text-white hover:bg-zinc-900"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {isDarkMode ? <Moon /> : <Sun />}
        </Button>

        <Button
          className="hidden bg-blue-600 text-white hover:bg-blue-500 sm:inline-flex"
          size="sm"
          onClick={handleAddNode}
        >
          <Plus />
          Add Node
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="topbar-action border-zinc-800 bg-[#101114] text-white hover:bg-zinc-900 sm:hidden"
          onClick={handleAddNode}
          aria-label="Add node"
          title="Add node"
        >
          <Plus />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="topbar-action border-zinc-800 bg-[#101114] text-white hover:bg-zinc-900 lg:hidden"
          onClick={() =>
            setMobilePanelOpen(true)
          }
          aria-label="Open right panel"
          title="Open right panel"
        >
          <PanelRightOpen />
        </Button>

        <button
          type="button"
          className="size-10 overflow-hidden rounded-full border border-zinc-700 bg-gradient-to-br from-fuchsia-400 via-blue-500 to-orange-300 text-sm font-bold text-white shadow-sm"
          aria-label="User avatar"
          title="User avatar"
        >
          KA
        </button>
      </div>
    </header>
  );
}
