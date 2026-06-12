export type NodeStatus =
  | "Healthy"
  | "Degraded"
  | "Down";

export type ServiceKind =
  | "api"
  | "database"
  | "cache"
  | "worker";

export type ServiceNodeData = {
  name: string;
  status: NodeStatus;
  cpu: number;
  description: string;
  kind: ServiceKind;
};

export interface AppSummary {
  id: string;
  name: string;
  language: string;
}
