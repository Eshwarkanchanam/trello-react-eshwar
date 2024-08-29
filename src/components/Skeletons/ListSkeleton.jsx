import { Skeleton } from "@mui/material";
import React from "react";

const ListSkeleton = () => {
  return (
    <div>
      <Skeleton variant="rounded" width={210} height={150} animation="wave" />
    </div>
  );
};

export default ListSkeleton;
