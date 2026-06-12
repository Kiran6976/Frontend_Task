import {
  Activity,
  Database,
  HardDrive,
  MemoryStick,
  Microchip,
  RadioTower,
  Server,
  Settings,
} from "lucide-react";
import {
  Handle,
  Position,
  type NodeProps,
} from "@xyflow/react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useGraphStore } from "@/store/graphStore";
import type {
  NodeStatus,
  ServiceKind,
  ServiceNodeData,
} from "@/types/graph";
import type { LucideIcon } from "lucide-react";

const statusClasses = {
  Healthy:
    "border-emerald-500/50 bg-emerald-500/10 text-emerald-300",
  Degraded:
    "border-amber-500/50 bg-amber-500/10 text-amber-300",
  Down: "border-red-500/50 bg-red-500/10 text-red-300",
} satisfies Record<
  ServiceNodeData["status"],
  string
>;

const iconByKind = {
  api: Server,
  database: Database,
  cache: HardDrive,
  worker: RadioTower,
} satisfies Record<ServiceKind, typeof Server>;

const kindStyles = {
  api: {
    border: "border-l-4 border-l-violet-600 dark:border-l-violet-500",
    iconBg: "bg-violet-50 border border-violet-100 text-violet-600 dark:bg-violet-500/10 dark:border-violet-500/20 dark:text-violet-400",
    accent: "text-violet-600 dark:text-violet-400",
  },
  database: {
    border: "border-l-4 border-l-cyan-600 dark:border-l-cyan-500",
    iconBg: "bg-cyan-50 border border-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:border-cyan-500/20 dark:text-cyan-400",
    accent: "text-cyan-600 dark:text-cyan-400",
  },
  cache: {
    border: "border-l-4 border-l-amber-600 dark:border-l-amber-500",
    iconBg: "bg-amber-5 border border-amber-100 text-amber-600 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400",
    accent: "text-amber-600 dark:text-amber-400",
  },
  worker: {
    border: "border-l-4 border-l-emerald-600 dark:border-l-emerald-500",
    iconBg: "bg-emerald-5 border border-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400",
    accent: "text-emerald-600 dark:text-emerald-400",
  },
} satisfies Record<
  ServiceKind,
  { border: string; iconBg: string; accent: string }
>;

const statuses: NodeStatus[] = [
  "Healthy",
  "Degraded",
  "Down",
];

const resourceTabs: {
  value: string;
  label: string;
  icon: LucideIcon;
}[] = [
  {
    value: "cpu",
    label: "CPU",
    icon: Microchip,
  },
  {
    value: "memory",
    label: "Memory",
    icon: MemoryStick,
  },
  {
    value: "disk",
    label: "Disk",
    icon: HardDrive,
  },
  {
    value: "region",
    label: "Region",
    icon: Database,
  },
];

export default function ServiceNode({
  data,
  id,
  selected,
}: NodeProps) {
  const service = data as ServiceNodeData;
  const Icon = iconByKind[service.kind];
  const [isConfigOpen, setIsConfigOpen] =
    useState(false);
  const updateNodeData = useGraphStore(
    (state) => state.updateNodeData
  );

  const style = kindStyles[service.kind] || kindStyles.api;

  return (
    <div
      className={cn(
        "service-node-card w-[340px] rounded-lg border bg-[#020305]/95 p-3.5 text-white shadow-[0_18px_45px_rgba(0,0,0,0.45)] transition",
        style.border,
        selected
          ? "border-blue-400 ring-2 ring-blue-500/10"
          : "border-zinc-800/90"
      )}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!border-zinc-900 !bg-blue-400"
      />

      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className={cn("flex size-8 items-center justify-center rounded-md shadow-sm", style.iconBg)}>
            <Icon className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              {service.name}
            </p>
            <p className="truncate text-xs text-zinc-500 uppercase tracking-wider text-[10px]">
              {service.kind}
            </p>
          </div>
        </div>

        <div className="nodrag nopan flex shrink-0 items-center gap-2">
          <span className="rounded-md border border-emerald-500/80 bg-emerald-500/10 px-2 py-1 text-[11px] font-semibold text-emerald-300">
            $0.03/HR
          </span>
          <button
            type="button"
            className={cn(
              "flex size-8 items-center justify-center rounded-md border text-zinc-200 transition hover:border-blue-400 hover:bg-slate-800 hover:text-white",
              isConfigOpen
                ? "border-blue-400 bg-blue-500/15 text-white"
                : "border-slate-700 bg-slate-900"
            )}
            onClick={(event) => {
              event.stopPropagation();
              setIsConfigOpen((open) => !open);
            }}
            aria-label={`Open ${service.name} settings`}
            title="Settings"
          >
            <Settings className="size-4" />
          </button>
        </div>
      </div>

      {isConfigOpen ? (
        <div className="node-config-panel nodrag nopan mt-3 space-y-3 rounded-md border border-blue-500/30 bg-blue-500/[0.06] p-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-white">
              Configuration
            </p>
            <button
              type="button"
              className="text-xs text-zinc-400 transition hover:text-white"
              onClick={(event) => {
                event.stopPropagation();
                setIsConfigOpen(false);
              }}
            >
              Close
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-zinc-400">
              Service name
            </label>
            <Input
              value={service.name}
              className="h-8 border-zinc-800 bg-black text-xs text-white"
              onChange={(event) =>
                updateNodeData(id, {
                  name: event.target.value,
                })
              }
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-zinc-400">
              Status
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {statuses.map((status) => (
                <button
                  key={status}
                  type="button"
                  className={cn(
                    "rounded-md border px-2 py-1.5 text-[11px] font-semibold transition",
                    service.status === status
                      ? statusClasses[status]
                      : "border-zinc-800 bg-black text-zinc-400 hover:border-zinc-600 hover:text-white"
                  )}
                  onClick={(event) => {
                    event.stopPropagation();
                    updateNodeData(id, {
                      status,
                    });
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-zinc-400">
              Description
            </label>
            <Textarea
              value={service.description}
              className="min-h-14 resize-none border-zinc-800 bg-black text-xs text-white"
              onChange={(event) =>
                updateNodeData(id, {
                  description:
                    event.target.value,
                })
              }
            />
          </div>
        </div>
      ) : null}

      <div className="mt-4 grid grid-cols-4 gap-1 text-center text-[10px] font-medium text-zinc-300">
        <span>0.02</span>
        <span>0.05 GB</span>
        <span>10.00 GB</span>
        <span>1</span>
      </div>

      <Tabs
        defaultValue="cpu"
        className="nodrag nopan mt-2 gap-2.5"
      >
        <TabsList className="node-tabs-list grid h-8 w-full grid-cols-4 overflow-hidden rounded-md bg-[#0d1424] p-0 text-[11px] text-zinc-300">
          {resourceTabs.map((tab) => {
            const TabIcon = tab.icon;

            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="gap-1 rounded-md px-1 data-[state=active]:bg-white data-[state=active]:text-zinc-950"
              >
                <TabIcon className="size-3" />
                {tab.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent
          value="cpu"
          className="space-y-2.5"
        >
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-300">
              CPU Budget
            </span>
            <span className="text-zinc-500">
              0-100
            </span>
          </div>
          <Slider
            value={[service.cpu]}
            min={0}
            max={100}
            step={1}
            className="[&_[data-slot=slider-range]]:bg-gradient-to-r [&_[data-slot=slider-range]]:from-blue-500 [&_[data-slot=slider-range]]:via-emerald-400 [&_[data-slot=slider-range]]:to-red-400 [&_[data-slot=slider-track]]:bg-zinc-800"
            onValueChange={(value) =>
              updateNodeData(id, {
                cpu: value[0] ?? 0,
              })
            }
          />
          <div className="h-8 rounded-md border border-zinc-800 bg-[#050608] px-3 py-1.5 text-right text-xs font-medium text-white">
            {service.cpu}
          </div>
        </TabsContent>

        <TabsContent
          value="memory"
          className="space-y-2"
        >
          <label className="text-xs text-zinc-300">
            Node Name
          </label>
          <div className="min-h-8 rounded-md border border-zinc-800 bg-[#050608] px-3 py-2 text-xs font-medium text-white">
            {service.name}
          </div>
        </TabsContent>

        <TabsContent
          value="disk"
          className="space-y-2"
        >
          <label className="text-xs text-zinc-300">
            Description
          </label>
          <div className="min-h-14 rounded-md border border-zinc-800 bg-[#050608] px-3 py-2 text-xs leading-relaxed text-zinc-300">
            {service.description}
          </div>
        </TabsContent>

        <TabsContent
          value="region"
          className="rounded-md border border-zinc-800 bg-[#050608] p-3 text-xs text-zinc-300"
        >
          <div className="flex items-center justify-between">
            <span>Provider</span>
            <span className="font-semibold text-orange-400">
              AWS / ap-south-1
            </span>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-3 flex items-center justify-between">
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-semibold",
            statusClasses[service.status]
          )}
        >
          <Activity className="size-3" />
          {service.status}
        </span>
        <span className="text-xl font-bold text-orange-400">
          aws
        </span>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!border-zinc-900 !bg-emerald-400"
      />
    </div>
  );
}
