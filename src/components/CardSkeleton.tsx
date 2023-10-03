import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import React from "react";

const CardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#f4f4f5" highlightColor="#d4d4d4">
      {Array(30)
        .fill(0)
        .map((e, index) => (
          <div className="mx-6 my-4 flex w-full max-w-xs flex-col items-center rounded-lg border border-neutral-400 p-6">
            <div className="flex h-52 w-52 items-center justify-center rounded-lg">
              <Skeleton width={208} height={208} />
            </div>
            <div className="my-4 flex flex-col items-center space-y-2">
              <Skeleton height={24} width={24} />
              <Skeleton height={24} width={208} count={2} />
            </div>
          </div>
        ))}
    </SkeletonTheme>
  );
};

export default CardSkeleton;
