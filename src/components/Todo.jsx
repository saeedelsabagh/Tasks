import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import "../App.css";
import { useContext } from "react";
import { context } from "./context";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";
import { MessageContext } from "./MessageContext";
import Reducer from "./redeucerfornewlist";
import { useReducer } from "react";
export default function Todo({ tasks, handledeleteclick }) {

  const { showHideMessage } = useContext(MessageContext);
  const {dispatch}=useContext(context);

  function handecheckclick(id) {
    dispatch({type:"check",payload:{id:id}})
    showHideMessage("Done task");
  }

  const [inputupdate, setinputupdate] = useState({ title: tasks.title });

  
  function updateforconfirmdupdate(id) {
    
    dispatch({type:"update",payload:{id:id,title:inputupdate.title}})
    showHideMessage("Updated");
  }

  // const [open, setOpen] = React.useState(false);
  // const handleClose = () => {
  //   setOpen(false);
  // };

  // function handledeleteclick() {
  //   setOpen(true);
  // }

  const [update, setupdate] = React.useState(false);

  const handleCloseupdateform = () => {
    setupdate(false);
  };
  function openeditform() {
    setupdate(true);
  }

  const handleupdateSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;

    console.log(email);
    updateforconfirmdupdate(tasks.id);
    handleCloseupdateform();
  };

  return (
    <React.Fragment>
      <Dialog open={update} onClose={handleCloseupdateform}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <form onSubmit={handleupdateSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              type="text"
              fullWidth
              value={inputupdate.title}
              onChange={(e) => {
                setinputupdate({ ...inputupdate, title: e.target.value });
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseupdateform}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <CssBaseline />
      <CardContent>
        <Card
          variant="outlined"
          sx={{
            background: "gray",
            color: "white",
            fontSize: 25,
            textAlign: "left",
            minHeight: 70,
            height: "auto",
            display: "grid",
            alignItems: "center",
          }}
        >
          <Grid
            container
            sx={{
              width: "100%",
              padding: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
            }}
          >
            {/* Task title */}
            <Grid size={12}>
              <Typography
                variant="h5"
                sx={{
                  whiteSpace: "normal",
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                  marginBottom: 1,
                  textDecoration: tasks.iscompleted ? "line-through" : "none",
                  textDecorationColor: tasks.iscompleted
                    ? "black"
                    : "transparent",
                  textDecorationThickness: "2px",
                }}
              >
                {tasks.title}
              </Typography>
            </Grid>

            {/* Icons */}
            <Grid
              size={12}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <IconButton
                className="iconHover"
                onClick={() => handecheckclick(tasks.id)}
                sx={{
                  background: tasks.iscompleted ? "green" : "white",
                  width: 40,
                  height: 40,
                  "&:hover": {
                    backgroundColor: tasks.iscompleted ? "green" : "white",
                  },
                }}
              >
                <CheckIcon
                  sx={{
                    color: tasks.iscompleted ? "white" : "green",
                  }}
                />
              </IconButton>

              <IconButton
                aria-label="edit"
                onClick={() => openeditform()}
                sx={{
                  background: "white",
                  width: 40,
                  height: 40,
                }}
              >
                <EditIcon sx={{ color: "black" }} />
              </IconButton>

              <IconButton
                aria-label="delete"
                onClick={() => handledeleteclick(tasks.id)}
                sx={{
                  background: "white",
                  width: 40,
                  height: 40,
                }}
              >
                <DeleteForeverIcon sx={{ color: "red" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Card>
      </CardContent>
    </React.Fragment>
  );
}
