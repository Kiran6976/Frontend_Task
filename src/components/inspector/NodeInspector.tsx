import { Activity, Cpu } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useAppStore } from "@/store/appStore";
import { useGraphStore } from "@/store/graphStore";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { ServiceNodeData } from "@/types/graph";

const badgeClasses = {
  Healthy:
    "border-emerald-500 bg-emerald-500/10 text-emerald-300",
  Degraded:
    "border-amber-500 bg-amber-500/10 text-amber-300",
  Down: "border-red-500 bg-red-500/10 text-red-300",
} satisfies Record<
  ServiceNodeData["status"],
  string
>;

const kindColorDot = {
  api: "bg-violet-500",
  database: "bg-cyan-500",
  cache: "bg-amber-500",
  worker: "bg-emerald-500",
} satisfies Record<
  ServiceNodeData["kind"],
  string
>;

const clampCpu = (value: number) =>
  Math.min(100, Math.max(0, value));

export default function NodeInspector() {
  const selectedNodeId = useAppStore(
    (state) => state.selectedNodeId
  );

  const activeInspectorTab = useAppStore(
    (state) => state.activeInspectorTab
  );

  const setActiveInspectorTab = useAppStore(
    (state) => state.setActiveInspectorTab
  );

  const nodes = useGraphStore(
    (state) => state.nodes
  );

  const updateNodeData = useGraphStore(
    (state) => state.updateNodeData
  );

  const node = nodes.find(
    (n) => n.id === selectedNodeId
  );

  if (!node) {
    return (
      <div className="rounded-md border border-dashed border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-500">
        Select a node on the canvas.
      </div>
    );
  }

  const service = node.data;

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-zinc-800 bg-zinc-950 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold">
              {service.name}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-xs uppercase tracking-wide text-zinc-500 font-semibold">
              <span className={cn("size-2 rounded-full shrink-0", kindColorDot[service.kind])} />
              {service.kind} Node
            </p>
          </div>

          <Badge
            variant="outline"
            className={cn(
              "shrink-0",
              badgeClasses[service.status]
            )}
          >
            <Activity className="mr-1 size-3" />
            {service.status}
          </Badge>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-md border border-zinc-800 bg-black p-3">
          <Cpu className="size-4 text-blue-400" />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-zinc-500">
              Runtime CPU
            </p>
            <p className="text-sm font-semibold">
              {service.cpu}%
            </p>
          </div>
        </div>
      </div>

      <Tabs
        value={activeInspectorTab}
        onValueChange={setActiveInspectorTab}
      >
        <TabsList className="grid w-full grid-cols-2 bg-zinc-900">
          <TabsTrigger value="config">
            Config
          </TabsTrigger>

          <TabsTrigger value="runtime">
            Runtime
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="config"
          className="mt-4 space-y-4"
        >
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">
              Node Name
            </label>

            <Input
              value={service.name}
              className="border-zinc-800 bg-zinc-950 text-white"
              onChange={(e) =>
                updateNodeData(node.id, {
                  name: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-zinc-300">
              Description
            </label>

            <Textarea
              value={service.description}
              className="min-h-24 border-zinc-800 bg-zinc-950 text-white"
              onChange={(e) =>
                updateNodeData(node.id, {
                  description: e.target.value,
                })
              }
            />
          </div>
        </TabsContent>

        <TabsContent
          value="runtime"
          className="mt-4 space-y-4"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-300">
                CPU Budget
              </label>
              <span className="text-xs text-zinc-500">
                0-100
              </span>
            </div>

            <Slider
              value={[service.cpu]}
              max={100}
              min={0}
              step={1}
              onValueChange={(value) =>
                updateNodeData(node.id, {
                  cpu: value[0] ?? 0,
                })
              }
            />
          </div>

          <Input
            type="number"
            min={0}
            max={100}
            value={service.cpu}
            className="border-zinc-800 bg-zinc-950 text-white"
            onChange={(e) =>
              updateNodeData(node.id, {
                cpu: clampCpu(
                  Number(e.target.value)
                ),
              })
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
