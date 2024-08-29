import { Box, Button, OutlinedInput, Paper, Typography } from "@mui/material";
import React, { useState } from "react";

const CreateComponent = ({
  title,
  placeholder,
  name,
  setName,
  handleCreate,
  buttonName,
}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Button
          variant="contained"
          sx={{
            display: "inline",
            ml: 4,
          }}
          onClick={(e) => {
            setShow((prev) => !prev);
          }}
        >
          <Typography sx={{ fontSize: "0.8rem" }}>{buttonName}</Typography>
        </Button>
        {show && (
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShow(false);
                setName('')
                handleCreate();
              }}
            >
              <OutlinedInput
                sx={{ fontSize: "0.8rem", my: 1 }}
                placeholder={placeholder}
                autoFocus
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <Button
                variant="contained"
                disabled={name.length === 0}
                type="submit"
                width='100%'
              >
                create
              </Button>
            </form>
          </Paper>
        )}
      </Box>
    </>
  );
};

export default CreateComponent;
