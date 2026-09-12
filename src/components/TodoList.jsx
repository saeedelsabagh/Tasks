import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Todo from "./Todo";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useContext } from "react";
import { context } from "./context";
import { useEffect } from "react";
import { useMemo } from "react";
import { DeleteDialoge } from "./deleteDialoge";
import { MessageContext } from "./MessageContext";

export default function TodoList() {
  const { todos, dispatch } = useContext(context);
  const [input, setinput] = useState("");
  const [classes, setclasses] = useState("all");
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { showHideMessage } = useContext(MessageContext);

  function handledeleteclick(id) {
    setDeleteId(id);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const completedTasks = useMemo(() => {
    return todos.filter((t) => {
      return t.iscompleted;
    });
  }, [todos]);

  const uncompletedTasks = useMemo(() => {
    return todos.filter((t) => {
      return !t.iscompleted;
    });
  }, [todos]);

  let clicktoberender = todos;

  if (classes == "complete") {
    clicktoberender = completedTasks;
  } else if (classes == "noncomplete") {
    clicktoberender = uncompletedTasks;
  } else {
    clicktoberender = todos;
  }

  const taskList = clicktoberender.map((t) => {
    return (
      <Todo
        key={t.id}
        tasks={t}
        handledeleteclick={handledeleteclick}
      />
    );
  });

  function handleclick() {
    dispatch({ type: "add", payload: { newTitle: input } });
    setinput("");
    showHideMessage("Added");
  }

  useEffect(() => {
    const getster = JSON.parse(localStorage.getItem("strlist"));

    if (getster) {
      dispatch({
        type: "load",
        payload: {
          todos: getster,
        },
      });
    }
  }, []);

  function changeclasses(e, newValue) {
    setclasses(newValue);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <DeleteDialoge
        open={open}
        handleClose={handleClose}
        deleteId={deleteId}
      />
      <Container maxWidth="md">
        <CardContent>
          <Card variant="outlined" sx={{ minHeight: 300 }}>
            <Typography
              variant="h1"
              gutterBottom
              sx={{
                color: "text.secondary",
                fontSize: 40,
                textAlign: "center",
              }}
            >
              مهامي
            </Typography>
            <Divider />
            <Tabs value={classes} onChange={changeclasses}>
              <Tab label="Done Task" value="complete" />
              <Tab label="Wait Task" value="noncomplete" />
              <Tab label="All Task" value="all" />
            </Tabs>
            {taskList}
            <Divider />
            <Grid
              container
              sx={{
                width: "100%",
                marginBottom: 2,
                marginTop: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              {/* Input */}
              <Grid
                size={{ xs: 12, sm: 8 }}
                sx={{
                  width: { xs: "80%", sm: "100%" },
                  display: "flex",
                  justifyContent: "center",
                  margin: 2,
                }}
              >
                <TextField
                  id="standard-basic"
                  label="add task"
                  variant="standard"
                  sx={{ width: "100%" }}
                  value={input}
                  onChange={(event) => {
                    setinput(event.target.value);
                  }}
                />
              </Grid>

              {/* Button */}
              <Grid
                size={{ xs: 12, sm: 4 }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: { xs: "80%", sm: "100%" },
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    width: { xs: "100%", sm: 200 },
                  }}
                  onClick={() => {
                    handleclick();
                  }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Card>
        </CardContent>
      </Container>
    </React.Fragment>
  );
}
