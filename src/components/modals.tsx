"use client";

import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-model";
import { useEffect, useState } from "react";

// import { CreateChannelModal } from "@/features/channels/components/create-channel-modal";

export const Modals = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <CreateWorkspaceModal />
      {/* <CreateChannelModal /> */}
    </>
  );
};