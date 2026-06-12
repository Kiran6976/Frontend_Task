import { create } from "zustand";
import {
  applyEdgeChanges,
  applyNodeChanges,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
} from "@xyflow/react";

import type { ServiceNodeData } from "@/types/graph";

interface GraphStore {
  nodes: Node<ServiceNodeData>[];
  edges: Edge[];

  setGraph: (
    nodes: Node<ServiceNodeData>[],
    edges: Edge[]
  ) => void;
  clearGraph: () => void;
  onNodesChange: (
    changes: NodeChange<Node<ServiceNodeData>>[]
  ) => void;
  onEdgesChange: (
    changes: EdgeChange<Edge>[]
  ) => void;
  addServiceNode: () => string;
  deleteNode: (id: string) => void;

  updateNodeData: (
    id: string,
    updates: Partial<ServiceNodeData>
  ) => void;
}

export const useGraphStore =
  create<GraphStore>((set) => ({
    nodes: [],
    edges: [],

    setGraph: (nodes, edges) =>
      set({ nodes, edges }),

    clearGraph: () =>
      set({ nodes: [], edges: [] }),

    onNodesChange: (changes) =>
      set((state) => ({
        nodes: applyNodeChanges(
          changes,
          state.nodes
        ),
      })),

    onEdgesChange: (changes) =>
      set((state) => ({
        edges: applyEdgeChanges(
          changes,
          state.edges
        ),
      })),

    addServiceNode: () => {
      const id = `custom-service-${Date.now()}`;

      set((state) => {
        const index = state.nodes.length;

        return {
          nodes: [
            ...state.nodes,
            {
              id,
              type: "service",
              position: {
                x: 140 + (index % 3) * 220,
                y: 160 + Math.floor(index / 3) * 180,
              },
              data: {
                name: `Service ${index + 1}`,
                status: "Healthy",
                cpu: 30,
                description:
                  "New service node created from the top bar.",
                kind: "api",
              },
            },
          ],
        };
      });

      return id;
    },

    deleteNode: (id) =>
      set((state) => ({
        nodes: state.nodes.filter(
          (node) => node.id !== id
        ),
        edges: state.edges.filter(
          (edge) =>
            edge.source !== id &&
            edge.target !== id
        ),
      })),

    updateNodeData: (id, updates) =>
      set((state) => ({
        nodes: state.nodes.map((node) =>
          node.id === id
            ? {
                ...node,
                data: {
                  ...node.data,
                  ...updates,
                },
              }
            : node
        ),
      })),
  }));
