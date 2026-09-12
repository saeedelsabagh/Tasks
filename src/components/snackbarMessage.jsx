import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useContext } from "react";
import { MessageContext } from "./MessageContext";
export default function SnackbarsMassege() {
  const {showHideMessage,openMessage, setOpenMessage ,message} = useContext(MessageContext);

  

  return (
    <div>
      <Snackbar
        open={openMessage}
        autoHideDuration={2300}
        onClose={() => setOpenMessage(false)}
      >
        
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
        {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
