"use client"

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";


 const WorkspaceIdPage=()=>{
    const workspaceId=useWorkspaceId();
    // console.log(workspaceId);
    
    const data=useGetWorkspace({id:workspaceId})

    return(
        <div>
            Data:{JSON.stringify(data)}
            id:{workspaceId}
        </div>
    )
}

export default WorkspaceIdPage;