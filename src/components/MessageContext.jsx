import { createContext } from "react";
import SnackbarsMassege from "./snackbarMessage";
import { useState } from "react";

export const MessageContext = createContext({});

export const MessageProvider = ({ children }) => {
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState("");
  //   const { click, setclick } = useContext(context);
  function showHideMessage(MyMessage) {
    setOpenMessage(true);
    setMessage(MyMessage);

    setTimeout(() => {
      setOpenMessage(false);
    }, 2000);
  }

  return (
    <MessageContext.Provider
      value={{ showHideMessage, openMessage, setOpenMessage, message }}
    >
      <SnackbarsMassege />
      {children}
    </MessageContext.Provider>
  );
};
