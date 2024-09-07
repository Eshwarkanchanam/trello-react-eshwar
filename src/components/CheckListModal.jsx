import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useReducer, useState } from "react";
import {
  createCheckList,
  deleteCheckList,
} from "../apis/checklist/fetchCheckList";
import CheckList from "./CheckList";
import CreateComponent from "./CreateComponent";
import { useSnackbar } from "notistack";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchChecklists,
  addChecklist,
  deleteChecklist as deleteChecklistAction,
} from "../features/checklist/checklistSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CheckListModal({ onClose, cardId, open }) {
  const { checklists, error } = useSelector((state) => state.checklist);
  let dispatch = useDispatch();
  const [checkListName, setCheckListName] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(fetchChecklists(cardId));
  }, [cardId]);

  async function handleCreateCheckList() {
    try {
      let response = await createCheckList(cardId, checkListName);
      if (response.status === 200) {
        let checkList = response.data;
        dispatch(addChecklist(checkList));
      } else {
        throw new Error("something went wrong, please try again later");
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  }

  async function handleDeleteCheckList(checklistId, cardId) {
    try {
      enqueueSnackbar("Deleting checklist...", {
        variant: "error",
        autoHideDuration: 3000,
      });
      let response = await deleteCheckList(checklistId);
      if (response.status === 200) {
        dispatch(
          deleteChecklistAction({
            checklistId,
            cardId,
          })
        );
        enqueueSnackbar("Deleted checklist successfully", {
          variant: "success",
          autoHideDuration: 3000,
        });
      } else {
        throw new Error("something went wrong");
      }
    } catch (error) {
      console.error(error.message);
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  }

  if (error) {
  }

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box sx={style} display={"flex"} gap={1}>
          <Box flex={0.6}>
            {checklists[cardId]?.map((checklist) => (
              <CheckList
                key={checklist.id}
                checklist={checklist}
                onDeleteCheckList={handleDeleteCheckList}
              />
            ))}
          </Box>
          <Box
            flex={0.3}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Typography sx={{ mb: 1 }}>Add to card</Typography>

            <CreateComponent
              buttonName={"CheckLists"}
              title={"Checklist title"}
              placeholder={"enter checklist name"}
              name={checkListName}
              setName={setCheckListName}
              handleCreate={handleCreateCheckList}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
