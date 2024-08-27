import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import {
  createCheckList,
  getAllCheckListsOnCard,
} from "../functions/checklist/fetchCheckList";
import CheckList from "./CheckList";
import CreateComponent from "./CreateComponent";

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

export default function CheckListModal({ handleClose, cardId, open }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [checkLists, setCheckLists] = useState([]);

  const [addNewCheckList, setAddNewCheckList] = useState(false);
  const [checkListName, setCheckListName] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        let response = await getAllCheckListsOnCard(cardId);
        if (response.status === 200) {
          let allCheckLists = response.data;
          setCheckLists(allCheckLists);
          setError(false);
        } else {
          throw new Error("something went wrong");
        }
      } catch (error) {
        setError(true);
        console.error(error);
        // yet to create a toast
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  async function handleCreateCheckList() {
    try {
      let response = await createCheckList(cardId, checkListName);
      if (response.status === 200) {
        let checkList = response.data;
        setCheckLists((prevCheckLists) => [...prevCheckLists, checkList]);
      } else {
        throw new Error("something went wrong, please try again later");
      }
    } catch (error) {
      console.log(error);
      // yet to create a toast
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} display={"flex"} gap={1}>
          <Box flex={0.6}>
            {checkLists.map((checklist) => (
              <CheckList key={checklist.id} checklist={checklist} />
            ))}
          </Box>
          <Box
            flex={0.3}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Typography>Add to card</Typography>
            <Box position={"relative"}>
              <Button
                variant="contained"
                sx={{ my: 1, fontSize: "0.8rem" }}
                onClick={() => setAddNewCheckList((prev) => !prev)}
              >
                checklists
              </Button>
              {addNewCheckList && (
                <CreateComponent
                  title={"Checklist title"}
                  placeholder={"enter checklist name"}
                  name={checkListName}
                  setName={setCheckListName}
                  setShow={setAddNewCheckList}
                  handleCreate={handleCreateCheckList}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
