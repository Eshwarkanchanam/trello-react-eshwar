import { Skeleton } from "@mui/material";
import React from "react";

const DetailPageSkeleton = () => {
  return (
    <div>
      <Skeleton
        variant="rounded"
        width={150}
        height={50}
        animation="wave"
        sx={{ ml: 4, mt: 4 }}
      />
      <Skeleton
        variant="rounded"
        width={150}
        height={50}
        animation="wave"
        sx={{ ml: 4, mt: 4 }}
      />
    </div>
  );
};

export default DetailPageSkeleton;
