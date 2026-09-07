import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Todo from "./Todo";
import { v4 as iddd } from "uuid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useContext } from "react";
import { context } from "./context";
import { useEffect } from "react";

export default function TodoList() {
  const { click, setclick } = useContext(context);
  const [input, setinput] = useState("");
  const [classes, setclasses] = useState("all");

  const completedTasks = click.filter((t) => {
    return t.iscompleted;
  });

  const uncompletedTasks = click.filter((t) => {
    return !t.iscompleted;
  });

  let clicktoberender = click;

  if (classes == "complete") {
    clicktoberender = completedTasks;
  } else if (classes == "noncomplete") {
    clicktoberender = uncompletedTasks;
  } else {
    clicktoberender = click;
  }

  const taskList = clicktoberender.map((t) => {
    return <Todo key={t.id} tasks={t} />;
  });

  function a11yProps(index, value) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function handleclick() {
    const newList = {
      id: iddd(),
      title: input,
      iscompleted: false,
    };
    const setstr = [...click, newList];
    setclick(setstr);
    localStorage.setItem("strlist", JSON.stringify(setstr));
    setinput("");
  }

  useEffect(() => {
    const getster = JSON.parse(localStorage.getItem("strlist"));
    setclick(getster);
  }, []);

  function changeclasses(e,newValue) {
    setclasses(newValue);
  }



  
  return (
    <React.Fragment>
      <CssBaseline />
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
            <Grid container sx={{ marginBottom: 2, marginLeft: 2 }}>
              <Grid size={4} sx={{ marginTop: 11.5 }}>
                <Button
                  variant="outlined"
                  sx={{ width: 200 }}
                  onClick={(e) => {
                    handleclick();
                  }}
                >
                  Add
                </Button>
              </Grid>
              <Grid size={8} sx={{ marginTop: 10 }}>
                <TextField
                  id="standard-basic"
                  label="add task"
                  variant="standard"
                  sx={{ width: 500 }}
                  value={input}
                  onChange={(event) => {
                    setinput(event.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </Card>
        </CardContent>
      </Container>
    </React.Fragment>
  );
}
