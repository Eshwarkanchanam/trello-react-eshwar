import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <span style={{fontSize:'2rem'}}> 404 Page not found</span>
      <Link to={"/boards"}>
        <Button variant="contained" sx={{my:4}}>get Back To Board</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
