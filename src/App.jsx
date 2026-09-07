import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TodoList from "./components/TodoList";
import { useContext } from "react";
import { useState } from "react";
import { v4 as iddd } from "uuid";
import { context } from "./components/context";
const theme = createTheme({
  typography: {
    fontFamily: ["A"],
  },
});
const tasks = [
  {
    id: iddd(),
    title: "First Task",
    iscompleted: false,
  },
  {
    id: iddd(),
    title: "second Task",
    iscompleted: false,
  },
  {
    id: iddd(),
    title: "third Task",
    iscompleted: false,
  },
];
function App() {
  const [click, setclick] = useState(tasks); ///////////////
  return (
    <ThemeProvider theme={theme}>
      <context.Provider value={{ click, setclick }}>
        <div
          style={{
            background: "gray",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <TodoList />
        </div>
      </context.Provider>
    </ThemeProvider>
  );
}

export default App;
