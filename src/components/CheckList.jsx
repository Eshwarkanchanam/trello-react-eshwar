import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import React, { useState } from "react";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddComponent from "./AddComponent";
import { createCheckItem } from "../functions/checkItems/fetchCheckItems";

const CheckList = ({ checklist }) => {
  const [checkItems, setCheckItems] = useState(checklist.checkItems);
  const [addNewCheckItem, setAddNewCheckItem] = useState(false);
  const [checkItemName, setCheckItemName] = useState("");

  async function handleCreateCheckItem() {
    if (checkItemName.length === 0) {
      return;
    }

    try {
      let response = await createCheckItem(checklist.id, checkItemName);
      if (response.status === 200) {
        let checkItem = response.data;
        setCheckItems((prevCheckItems) => [...prevCheckItems, checkItem]);
      } else {
        throw new Error("something went wrong, please try again later");
      }
    } catch (error) {
      console.error(error);
      // yet to create a toast
    }
  }

  return (
    <Box my={2}>
      <Box component={"div"} display={"flex"} justifyContent={"space-between"}>
        <Box display={"flex"}>
          <CheckBoxIcon />
          {checklist.name}
        </Box>
        <Button variant="contained" sx={{ fontSize: "0.8rem" }}>
          delete
        </Button>
      </Box>
      <Box>------</Box>
      <FormGroup>
        {checkItems.map((checkitem) => (
          <FormControlLabel control={<Checkbox />} label={checkitem.name} />
        ))}
      </FormGroup>
      <AddComponent
        show={addNewCheckItem}
        setShow={setAddNewCheckItem}
        itemName={"checkitem"}
        name={checkItemName}
        setName={setCheckItemName}
        handleCreate={handleCreateCheckItem}
        placeholder={"enter new checkitem"}
      />
    </Box>
  );
};

export default CheckList;
