import { Skeleton } from "@mui/material";
import React from "react";

const BoardSkeleton = () => {
  return (
    <div>
      <Skeleton variant="rounded" width={150} height={100} animation='wave'/>
    </div>
  );
};

export default BoardSkeleton;
