import { Box, Button, FormGroup, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

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
import { useDispatch, useSelector } from "react-redux";

import {
  createCheckitems,
  addCheckitem,
  deleteCheckitem as deleteCheckitemAction,
  checkOrUncheckItem,
} from "../features/checkitems/checkitemSlice";

const CheckList = ({ checklist, onDeleteCheckList }) => {

  const [addNewCheckItem, setAddNewCheckItem] = useState(false);
  const [checkItemName, setCheckItemName] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const { checkitems, error } = useSelector((state) => state.checkitem);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createCheckitems(checklist));
  }, []);

  async function handleCreateCheckItem() {
    if (checkItemName.length === 0) {
      return;
    }

    try {
      let response = await createCheckItem(checklist.id, checkItemName);
      if (response.status === 200) {
        let checkItem = response.data;
        dispatch(addCheckitem(checkItem));
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
        dispatch(
          deleteCheckitemAction({
            checkListId,
            checkItemId,
          })
        );
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
    console.log(checkItemId);
    console.log(checklist.id);

    console.log(
      checkitems[checklist.id].find((checkitem) => checkitem.id === checkItemId)
    );

    try {
      let checkItem = checkitems[checklist.id].find(
        (checkitem) => checkitem.id === checkItemId
      );
      console.log(checkItem);

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

      dispatch(checkOrUncheckItem(checkItem));
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  }

  function calculateProgress() {
    let total = checkitems[checklist.id]?.length || 0;
    if (total !== 0) {
      let completed = checkitems[checklist.id].filter(
        (checkitem) => checkitem.state === "complete"
      ).length;
      let percent = (completed / total) * 100;
      return Math.floor(percent);
    }
  }

  if (error) {
    enqueueSnackbar(error.message, {
      variant: "error",
      autoHideDuration: 3000,
    });
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
              onDeleteCheckList(checklist.id, checklist.idCard);
            }}
          >
            delete
          </Button>
        </Box>
        <CheckItemsProgress progress={calculateProgress()} />
        <FormGroup>
          {checkitems[checklist.id]?.map((checkitem) => (
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
