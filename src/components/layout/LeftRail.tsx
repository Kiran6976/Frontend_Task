import {
  Boxes,
  Cable,
  Database,
  House,
  Layers3,
  Leaf,
  Package,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface RailItem {
  label: string;
  icon?: LucideIcon;
  symbolId?: string;
  className: string;
}

export default function LeftRail() {
  const navItems: RailItem[] = [
    {
      label: "Home",
      icon: House,
      className: "text-zinc-400",
    },
    {
      label: "GitHub",
      symbolId: "github-icon",
      className: "bg-white text-black",
    },
    {
      label: "Postgres",
      icon: Database,
      className: "text-sky-400",
    },
    {
      label: "Redis",
      icon: Boxes,
      className: "text-red-400",
    },
    {
      label: "MongoDB",
      icon: Leaf,
      className: "text-green-500",
    },
    {
      label: "Container",
      icon: Package,
      className: "text-zinc-300",
    },
    {
      label: "Blocks",
      icon: Layers3,
      className: "text-yellow-400",
    },
    {
      label: "Network",
      icon: Cable,
      className: "text-emerald-400",
    },
  ];

  return (
    <aside className="app-left-rail hidden w-16 shrink-0 flex-col items-center gap-3 border-r border-zinc-800 bg-black py-4 text-zinc-400 sm:flex">
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
        <button
          key={item.label}
          className="rail-button flex size-10 items-center justify-center rounded-md hover:bg-zinc-900 hover:text-white"
          aria-label={item.label}
          title={item.label}
        >
          {Icon ? (
            <Icon
              className={`size-5 ${item.className}`}
            />
          ) : item.symbolId ? (
            <span
              className={`flex size-8 items-center justify-center rounded-md ${item.className}`}
            >
              <svg
                className="size-5"
                aria-hidden="true"
              >
                <use
                  href={`/icons.svg#${item.symbolId}`}
                />
              </svg>
            </span>
          ) : (
            null
          )}
        </button>
        );
      })}
    </aside>
  );
}
