import AppSelector from "@/components/layout/AppSelector";
import NodeInspector from "@/components/inspector/NodeInspector";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAppStore } from "@/store/appStore";

export default function RightPanel() {
  const isMobilePanelOpen = useAppStore(
    (state) => state.isMobilePanelOpen
  );

  const setMobilePanelOpen = useAppStore(
    (state) => state.setMobilePanelOpen
  );

  const panelContent = (
    <div className="right-panel-content flex h-full flex-col gap-5 overflow-y-auto p-5">
      <section>
        <div className="mb-3">
          <h2 className="text-lg font-semibold">
            Application
          </h2>
          <p className="text-xs text-zinc-500">
            Select an app to load its graph.
          </p>
        </div>

        <AppSelector />
      </section>

      <section className="border-t border-zinc-800 pt-5">
        <div className="mb-3">
          <h2 className="text-lg font-semibold">
            Node Inspector
          </h2>
          <p className="text-xs text-zinc-500">
            Shows when a service node is selected.
          </p>
        </div>

        <NodeInspector />
      </section>
    </div>
  );

  return (
    <>
      <aside className="app-right-panel hidden w-[360px] shrink-0 border-l border-zinc-800 bg-[#030304] text-white lg:block">
        {panelContent}
      </aside>

      <Sheet
        open={isMobilePanelOpen}
        onOpenChange={setMobilePanelOpen}
      >
        <SheetContent
          side="right"
          className="w-[92vw] border-zinc-800 bg-black p-0 text-white sm:max-w-md"
        >
          <SheetHeader className="border-b border-zinc-800 p-4">
            <SheetTitle className="text-white">
              Graph Panel
            </SheetTitle>
          </SheetHeader>
          {panelContent}
        </SheetContent>
      </Sheet>
    </>
  );
}
