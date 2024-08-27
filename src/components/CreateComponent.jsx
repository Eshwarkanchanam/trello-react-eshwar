import { Button, OutlinedInput, Paper, Typography } from "@mui/material";
import React from "react";

const CreateComponent = ({
  title,
  placeholder,
  name,
  setName,
  setShow,
  handleCreate,
}) => {
  return (
    <Paper
      sx={{
        position: "absolute",
        border: 1,
        left: 0,
        top: "3rem",
        display: "flex",
        flexDirection: "column",
        p: 2,
        width: "200px",
        zIndex: 10,
      }}
      component={"div"}
    >
      <Typography sx={{ my: 1 }}>{title}*</Typography>
      <OutlinedInput
        sx={{ fontSize: "0.8rem", my: 1 }}
        placeholder={placeholder}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Button
        variant="contained"
        disabled={name.length === 0}
        onClick={() => {
          setShow(false);
          handleCreate();
        }}
      >
        create
      </Button>
    </Paper>
  );
};

export default CreateComponent;
