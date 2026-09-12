import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TodoList from "./components/TodoList";
import { v4 as iddd } from "uuid";
import SnackbarsMassege from "./components/snackbarMessage";
import { MessageContext } from "./components/MessageContext";
import { MessageProvider } from "./components/MessageContext";
import { Contextprovider } from "./components/context";
const theme = createTheme({
  typography: {
    fontFamily: ["A"],
  },
});



function App() {

  return (
    <ThemeProvider theme={theme}>
      <Contextprovider>
        <MessageProvider>
          <div
            style={{
              background: "gray",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TodoList />
          </div>
        </MessageProvider>
      </Contextprovider>
    </ThemeProvider>
  );
}

export default App;
