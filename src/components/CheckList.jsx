import { Box, Button, FormGroup, Typography } from "@mui/material";
import React, { useReducer, useState } from "react";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddComponent from "./AddComponent";
import {
  checkCheckItemOnCard,
  createCheckItem,
  deleteCheckItem,
  uncheckCheckItemOnCard,
} from "../apis/checkItems/fetchCheckItems";
import CheckItem from "./CheckItem";
import CheckItemsProgress from "./CheckItemsProgress";
import { useSnackbar } from "notistack";
import checkItemReducer from "../reducers/checkItemReducer";

const CheckList = ({ checklist, onDeleteCheckList }) => {
  const [checkItems, dispatch] = useReducer(checkItemReducer, [
    ...checklist.checkItems,
  ]);
  const [addNewCheckItem, setAddNewCheckItem] = useState(false);
  const [checkItemName, setCheckItemName] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  async function handleCreateCheckItem() {
    if (checkItemName.length === 0) {
      return;
    }

    try {
      let response = await createCheckItem(checklist.id, checkItemName);
      if (response.status === 200) {
        let checkItem = response.data;
        dispatch({
          type: "addCheckItem",
          payload: checkItem,
        });
      } else {
        throw new Error("something went wrong, please try again later");
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  }

  async function handleDeleteCheckItem(checkListId, checkItemId) {
    try {
      enqueueSnackbar("Deleting checkitem...", {
        variant: "error",
        autoHideDuration: 3000,
      });
      let response = await deleteCheckItem(checkListId, checkItemId);
      if (response.status === 200) {
        dispatch({
          type: "deleteCheckItem",
          deletedCheckItemId: checkItemId,
        });
        enqueueSnackbar("Deleted checkitem successfully", {
          variant: "success",
          autoHideDuration: 3000,
        });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  }

  async function handleCheckItem(checkItemId) {
    try {
      let checkItem = checkItems.find(
        (checkitem) => checkitem.id === checkItemId
      );
      let state = checkItem.state;
      if (state === "complete") {
        let response = await uncheckCheckItemOnCard(
          checklist.idCard,
          checkItemId
        );
        if (response.status === 200) {
          checkItem = response.data;
        } else {
          throw new Error("somthing went wrong");
        }
      } else {
        let response = await checkCheckItemOnCard(
          checklist.idCard,
          checkItemId
        );
        if (response.status === 200) {
          checkItem = response.data;
        } else {
          throw new Error("somthing went wrong");
        }
      }

      dispatch({
        type: "checkOrUncheckCheckItem",
        state: checkItem.state,
        checkItemId: checkItem.id,
      });
    } catch (error) {
      console.error(error);
    }
  }

  function calculateProgress() {
    let total = checkItems.length;
    if (total !== 0) {
      let completed = checkItems.filter(
        (checkitem) => checkitem.state === "complete"
      ).length;
      let percent = (completed / total) * 100;
      return Math.floor(percent);
    }
  }
  return (
    <Box sx={{ overflowY: "scroll", maxHeight: "60vh" }} component={"div"}>
      <Box my={2}>
        <Box
          component={"div"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"}>
            <CheckBoxIcon />
            {checklist.name}
          </Box>
          <Button
            variant="contained"
            sx={{ fontSize: "0.8rem" }}
            onClick={(e) => {
              e.stopPropagation();
              onDeleteCheckList(checklist.id);
            }}
          >
            delete
          </Button>
        </Box>
        <CheckItemsProgress progress={calculateProgress()} />
        <FormGroup>
          {checkItems.map((checkitem) => (
            <CheckItem
              key={checkitem.id}
              checkitem={checkitem}
              onDeleteCheckItem={handleDeleteCheckItem}
              handleCheckItem={handleCheckItem}
            />
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
    </Box>
  );
};

export default CheckList;
