import { v4 as iddd } from "uuid";

export default function Reducer(state, action) {
  switch (action.type) {
    case "add": {
      const newList = {
        id: iddd(),
        title: action.payload.newTitle,
        iscompleted: false,
      };
      const setstr = [...state, newList];

      localStorage.setItem("strlist", JSON.stringify(setstr));

      return setstr;
    }
    case "delete": {
      const confirmdelete = state.filter((t) => {
        return t.id !== action.payload.id;
      });

      localStorage.setItem("strlist", JSON.stringify(confirmdelete));

      return confirmdelete;
    }
    case "check": {
      const updateIsCompleted = state.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            iscompleted: !t.iscompleted,
          };
        }

        return t;
      });

      localStorage.setItem("strlist", JSON.stringify(updateIsCompleted));

      return updateIsCompleted;
    }
    case "update": {
      const confirmupdate = state.map((t) => {
        if (t.id === action.payload.id) {
          return { ...t, title: action.payload.title };
        } else {
          return t;
        }
      });

      localStorage.setItem("strlist", JSON.stringify(confirmupdate));

      return confirmupdate;
    }
    case "load": {
      return action.payload.todos;
    }
    default: {
      console.log("aaaaaaaaaa" + action.type);
    }
  }
}
