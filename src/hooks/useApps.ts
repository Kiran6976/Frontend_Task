import { useQuery } from "@tanstack/react-query";

import {
  getApps,
  getGraph,
} from "@/api/mockApi";

export const useApps = () => {
  return useQuery({
    queryKey: ["apps"],
    queryFn: getApps,
  });
};

export const useAppGraph = (
  appId: string | null
) => {
  return useQuery({
    queryKey: ["apps", appId, "graph"],
    queryFn: () => getGraph(appId ?? ""),
    enabled: Boolean(appId),
  });
};
