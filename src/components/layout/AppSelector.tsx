import {
  AlertTriangle,
  ChevronRight,
  Lightbulb,
  Plus,
  RefreshCw,
  Rocket,
  Search,
  Settings,
} from "lucide-react";
import {
  useEffect,
  useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  setMockGraphFailure,
} from "@/api/mockApi";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useApps } from "@/hooks/useApps";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/appStore";
import { useGraphStore } from "@/store/graphStore";

const appStyles = [
  {
    icon: Lightbulb,
    color: "bg-indigo-500",
  },
  {
    icon: Settings,
    color: "bg-purple-500",
  },
  {
    icon: Rocket,
    color: "bg-red-500",
  },
  {
    icon: Rocket,
    color: "bg-pink-500",
  },
];

export default function AppSelector() {
  const {
    data,
    isLoading,
    error,
  } = useApps();

  const queryClient = useQueryClient();

  const selectedAppId = useAppStore(
    (state) => state.selectedAppId
  );

  const setSelectedAppId = useAppStore(
    (state) => state.setSelectedAppId
  );

  const setSelectedNodeId = useAppStore(
    (state) => state.setSelectedNodeId
  );

  const requestFitView = useAppStore(
    (state) => state.requestFitView
  );

  const addServiceNode = useGraphStore(
    (state) => state.addServiceNode
  );

  const [shouldFail, setShouldFail] =
    useState(false);

  useEffect(() => {
    setMockGraphFailure(false);
  }, []);

  useEffect(() => {
    if (!selectedAppId && data?.[0]) {
      setSelectedAppId(data[0].id);
    }
  }, [
    data,
    selectedAppId,
    setSelectedAppId,
  ]);

  const toggleMockError = async () => {
    const nextValue = !shouldFail;

    setShouldFail(nextValue);
    setMockGraphFailure(nextValue);
    await queryClient.invalidateQueries({
      queryKey: ["apps", selectedAppId, "graph"],
    });
  };

  const handleAddNode = () => {
    const nodeId = addServiceNode();

    setSelectedNodeId(nodeId);
    requestFitView();
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 rounded-md bg-zinc-900" />
        <Skeleton className="h-14 rounded-md bg-zinc-900" />
        <Skeleton className="h-14 rounded-md bg-zinc-900" />
        <Skeleton className="h-14 rounded-md bg-zinc-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md border border-red-900 bg-red-950/40 p-3 text-sm text-red-200">
        Failed to load apps
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
          <input
            placeholder="Search..."
            className="app-search-input h-10 w-full rounded-md border border-zinc-800 bg-[#141416] px-3 pr-9 text-sm outline-none transition focus:border-blue-500"
          />
        </div>

        <Button
          size="icon"
          className="bg-blue-600 text-white hover:bg-blue-500"
          onClick={handleAddNode}
          aria-label="Add node"
          title="Add node"
        >
          <Plus />
        </Button>
      </div>

      <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
        {data?.map((app, index) => {
          const style =
            appStyles[index % appStyles.length];
          const Icon = style.icon;
          const selected =
            app.id === selectedAppId;

          return (
            <button
              key={app.id}
              onClick={() =>
                setSelectedAppId(app.id)
              }
              className={cn(
                "app-card flex w-full items-center justify-between rounded-md border p-3 text-left transition",
                selected
                  ? "border-blue-500 bg-blue-500/10 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.15)]"
                  : "border-zinc-800 bg-[#08090b] hover:border-zinc-700 hover:bg-zinc-900"
              )}
            >
              <span className="flex min-w-0 items-center gap-3">
                <span
                  className={cn(
                    "flex size-10 items-center justify-center rounded-md text-white",
                    style.color
                  )}
                >
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">
                    {app.name}
                  </span>
                  <span className="block text-xs text-zinc-500">
                    {app.language}
                  </span>
                </span>
              </span>

              <ChevronRight className="size-4 shrink-0 text-zinc-500" />
            </button>
          );
        })}
      </div>

      <div className="app-error-toggle rounded-md border border-zinc-800 bg-[#08090b] p-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-sm font-medium">
              <AlertTriangle className="size-4 text-amber-400" />
              Mock error
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Toggle graph request failure.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            className={cn(
              "border-zinc-800 bg-black text-white hover:bg-zinc-900",
              shouldFail &&
                "border-red-500 text-red-300"
            )}
            onClick={toggleMockError}
          >
            <RefreshCw />
            {shouldFail ? "On" : "Off"}
          </Button>
        </div>
      </div>
    </div>
  );
}
