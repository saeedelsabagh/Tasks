import { context } from "./context";
import { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { MessageContext } from "./MessageContext";

export function DeleteDialoge({ open, handleClose, deleteId }) {

  const { showHideMessage } = useContext(MessageContext);
  const {dispatch}=useContext(context);

  function updateforconfirmdelete(id) {
    handleClose(); 
    dispatch({
      type: "delete",
      payload: { id: deleteId, handleClose: handleClose },
    });
    showHideMessage("Deleted done");
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      role="alertdialog"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure to delete it ?"}
      </DialogTitle>

      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Cancel
        </Button>
        <Button onClick={updateforconfirmdelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
