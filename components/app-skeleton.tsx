import React from "react";
import { SkeletonCard } from "./skeleton-card";

const AppSkeleton = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
};

export default AppSkeleton;
