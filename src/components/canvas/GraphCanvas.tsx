import {
  ReactFlow,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  useReactFlow,
  type DefaultEdgeOptions,
  type FitViewOptions,
  type NodeTypes,
} from "@xyflow/react";

import { useAppStore } from "@/store/appStore";
import { useGraphStore } from "@/store/graphStore";
import { useAppGraph } from "@/hooks/useApps";
import ServiceNode from "@/components/canvas/ServiceNode";

import { useEffect } from "react";

import "@xyflow/react/dist/style.css";

const nodeTypes: NodeTypes = {
  service: ServiceNode,
};

const fitViewOptions: FitViewOptions = {
  padding: 0.18,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  type: "smoothstep",
  style: {
    stroke: "#5b6575",
    strokeWidth: 1.4,
  },
  animated: false,
};

function GraphCanvasInner() {
  const reactFlow = useReactFlow();

  const setSelectedNodeId = useAppStore(
    (state) => state.setSelectedNodeId
  );

  const selectedNodeId = useAppStore(
    (state) => state.selectedNodeId
  );

  const selectedAppId = useAppStore(
    (state) => state.selectedAppId
  );

  const fitViewRequest = useAppStore(
    (state) => state.fitViewRequest
  );

  const toggleApplicationPanel = useAppStore(
    (state) => state.toggleApplicationPanel
  );

  const nodes = useGraphStore(
    (state) => state.nodes
  );

  const edges = useGraphStore(
    (state) => state.edges
  );

  const setGraph = useGraphStore(
    (state) => state.setGraph
  );

  const clearGraph = useGraphStore(
    (state) => state.clearGraph
  );

  const onNodesChange = useGraphStore(
    (state) => state.onNodesChange
  );

  const onEdgesChange = useGraphStore(
    (state) => state.onEdgesChange
  );

  const deleteNode = useGraphStore(
    (state) => state.deleteNode
  );

  const graphQuery = useAppGraph(selectedAppId);

  useEffect(() => {
    if (graphQuery.data) {
      setGraph(
        graphQuery.data.nodes,
        graphQuery.data.edges
      );
    }
  }, [graphQuery.data, setGraph]);

  useEffect(() => {
    if (!selectedAppId) {
      clearGraph();
    }
  }, [clearGraph, selectedAppId]);

  useEffect(() => {
    if (nodes.length > 0) {
      void reactFlow.fitView({
        padding: 0.25,
        duration: 350,
      });
    }
  }, [fitViewRequest, nodes.length, reactFlow]);

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      // Check if user is typing in an input or textarea
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // Handle node deletion
      if (
        event.key === "Delete" ||
        event.key === "Backspace"
      ) {
        if (!selectedNodeId) return;
        deleteNode(selectedNodeId);
        setSelectedNodeId(null);
      }

      // Handle Fit View shortcut
      if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        void reactFlow.fitView({
          padding: 0.25,
          duration: 350,
        });
      }

      // Handle Toggle Application Panel shortcut
      if (event.key.toLowerCase() === "p") {
        event.preventDefault();
        toggleApplicationPanel();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [
    selectedNodeId,
    deleteNode,
    setSelectedNodeId,
    reactFlow,
    toggleApplicationPanel,
  ]);

  return (
    <div className="h-full w-full">
      {graphQuery.isLoading ? (
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-zinc-800 bg-black px-4 py-3 text-sm text-zinc-300">
          Loading graph...
        </div>
      ) : null}

      {graphQuery.isError ? (
        <div className="absolute left-1/2 top-1/2 z-10 max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border border-red-900 bg-red-950/80 px-4 py-3 text-sm text-red-100">
          Failed to load graph. Turn off the mock error and retry from the app panel.
        </div>
      ) : null}

      <ReactFlow
        fitView
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onPaneClick={() => setSelectedNodeId(null)}
        onNodeClick={(_, node) => {
          setSelectedNodeId(node.id);
        }}
        deleteKeyCode={["Backspace", "Delete"]}
        fitViewOptions={fitViewOptions}
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <Background
          variant={BackgroundVariant.Dots}
          color="#28303a"
          gap={22}
          size={1.6}
        />
      </ReactFlow>
    </div>
  );
}

export default function GraphCanvas() {
  return (
    <ReactFlowProvider>
      <GraphCanvasInner />
    </ReactFlowProvider>
  );
}
