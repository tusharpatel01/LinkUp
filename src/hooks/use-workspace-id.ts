import { useParams } from "next/navigation";
import { Id } from "../../convex/_generated/dataModel";

export const useWorkspaceId = (): Id<"workspaces"> | undefined => {
  const params = useParams();
  return params.workspaceId ? (params.workspaceId as Id<"workspaces">) : undefined;
};
