"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import React from "react";

const Page = () => {
  const tasks = useQuery(api.tasks.get, undefined); // ✅ pass undefined

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {tasks?.map(({ _id, text }) => (
        <div key={_id}>{text}</div>
      ))}
    </main>
  );
};

export default Page;
