import type { Edge, Node } from "@xyflow/react";

import type {
  AppSummary,
  ServiceNodeData,
} from "@/types/graph";

let shouldFailGraph = false;

export const setMockGraphFailure = (
  shouldFail: boolean
) => {
  shouldFailGraph = shouldFail;
};

export const mockApps: AppSummary[] = [
  {
    id: "golang",
    name: "supertokens-golang",
    language: "Go",
  },

  {
    id: "java",
    name: "supertokens-java",
    language: "Java",
  },

  {
    id: "python",
    name: "supertokens-python",
    language: "Python",
  },

  {
    id: "ruby",
    name: "supertokens-ruby",
    language: "Ruby",
  },
];

export const getApps = async () => {
  await new Promise((resolve) =>
    setTimeout(resolve, 500)
  );

  return mockApps;
};

export const getGraph = async (
  appId: string
) => {
  await new Promise((resolve) =>
    setTimeout(resolve, 650)
  );

  if (shouldFailGraph) {
    throw new Error(
      "Failed to load graph"
    );
  }

  const offset = appId === "java" ? 80 : appId === "python" ? -40 : 0;

  return {
    appId,
    nodes: [
      {
        id: `${appId}-api`,
        type: "service",
        position: { x: 80 + offset, y: 110 },
        data: {
          name: "Auth API",
          status: "Healthy",
          cpu: 38,
          description:
            "Primary service handling token sessions and API requests.",
          kind: "api",
        },
      },
      {
        id: `${appId}-postgres`,
        type: "service",
        position: { x: 560 + offset, y: 90 },
        data: {
          name: "Postgres",
          status: appId === "python" ? "Degraded" : "Healthy",
          cpu: appId === "python" ? 64 : 24,
          description:
            "Relational datastore for users, tenants, and audit records.",
          kind: "database",
        },
      },
      {
        id: `${appId}-redis`,
        type: "service",
        position: { x: 270 + offset, y: 390 },
        data: {
          name: "Redis",
          status: appId === "java" ? "Down" : "Degraded",
          cpu: appId === "java" ? 88 : 52,
          description:
            "Ephemeral cache used for fast session lookups and queues.",
          kind: "cache",
        },
      },
      {
        id: `${appId}-worker`,
        type: "service",
        position: { x: 710 + offset, y: 385 },
        data: {
          name: "Webhook Worker",
          status: "Healthy",
          cpu: 31,
          description:
            "Processes delivery retries and background integrations.",
          kind: "worker",
        },
      },
    ] satisfies Node<ServiceNodeData>[],
    edges: [
      {
        id: `${appId}-e-api-postgres`,
        source: `${appId}-api`,
        target: `${appId}-postgres`,
        animated: true,
      },
      {
        id: `${appId}-e-api-redis`,
        source: `${appId}-api`,
        target: `${appId}-redis`,
        animated: true,
      },
      {
        id: `${appId}-e-api-worker`,
        source: `${appId}-api`,
        target: `${appId}-worker`,
      },
    ] satisfies Edge[],
  };
};
