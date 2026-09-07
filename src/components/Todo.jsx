import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
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
import DialogContentText from "@mui/material/DialogContentText";
import { useState } from "react";

export default function Todo({ tasks }) {
  const { click, setclick } = useContext(context);

  function updateforconfirmdelete(id) {
    const confirmdelete = click.filter((t) => {
      return t.id !== id;
    });

    setclick(confirmdelete);

    localStorage.setItem("strlist", JSON.stringify(confirmdelete));
  }

  function handecheckclick(id) {
    const updateIsCompleted = click.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          iscompleted: !t.iscompleted,
        };
      }

      return t;
    });

    setclick(updateIsCompleted);

    localStorage.setItem("strlist", JSON.stringify(updateIsCompleted));
  }

  const [inputupdate, setinputupdate] = useState({ title: tasks.title });
  function updateforconfirmdupdate(id) {
    const confirmupdate = click.map((t) => {
      if (t.id === id) {
        return { ...t, title: inputupdate.title };
      } else {
        return t;
      }
    });
    setclick(confirmupdate);
    localStorage.setItem("strlist", JSON.stringify(confirmupdate));
  }

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  function handledeleteclick() {
    setOpen(true);
  }

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
          <Button
            onClick={() => {
              updateforconfirmdelete(tasks.id);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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
            height: 70,
            display: "grid",
            alignItems: "center",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{ paddingLeft: 0, display: "flex", justifyContent: "right" }}
          >
            <Grid size={8}>
              <Typography variant="h5" gutterBottom>
                {tasks.title}
              </Typography>
            </Grid>
            <Grid
              size={1}
              className="iconHover"
              sx={{
                background: tasks.iscompleted ? "green" : "white",
                borderRadius: "50%",
                height: 40,
                width: 40,
                display: "grid",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                aria-label="delete"
                onClick={() => handecheckclick(tasks.id)}
              >
                <CheckIcon
                  className="iconHover"
                  sx={{ color: tasks.iscompleted ? "white" : "green" }}
                />
              </IconButton>
            </Grid>
            <Grid
              size={1}
              className="iconHover"
              sx={{
                background: "white",
                borderRadius: "50%",
                height: 40,
                width: 40,
                display: "grid",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton aria-label="delete" onClick={() => openeditform()}>
                <EditIcon className="iconHover" sx={{ color: "black" }} />
              </IconButton>
            </Grid>
            <Grid
              size={1}
              className="iconHover"
              sx={{
                background: "white",
                borderRadius: "50%",
                height: 40,
                width: 40,
                display: "grid",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                aria-label="delete "
                sx={{ color: "red" }}
                onClick={() => handledeleteclick()}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Grid>
            <Grid size={1}></Grid>
          </Grid>
        </Card>
      </CardContent>
    </React.Fragment>
  );
}
