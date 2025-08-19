import React from "react";

export default function ProjectCardPlaceholder() {
  return (
    <div className="border rounded-lg shadow-sm animate-pulse">
      <div className="aspect-video bg-zinc-300 dark:bg-zinc-700 rounded-t-lg" />
      <div className="p-4 space-y-4">
        <div className="h-6 bg-zinc-300 dark:bg-zinc-700 rounded w-3/4"></div>
        <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-full"></div>
        <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-5/6"></div>

        <div className="flex gap-2 mt-2">
          <div className="h-6 w-16 bg-zinc-300 dark:bg-zinc-700 rounded"></div>
          <div className="h-6 w-16 bg-zinc-300 dark:bg-zinc-700 rounded"></div>
        </div>

        <div className="flex gap-2 mt-4">
          <div className="h-8 w-24 bg-zinc-300 dark:bg-zinc-700 rounded"></div>
          <div className="h-8 w-24 bg-zinc-300 dark:bg-zinc-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}
