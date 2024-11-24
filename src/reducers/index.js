// @flow
import data from "../data";
import usersReducer from "./users";
import sessionsReducer from "./sessions";
import { reducer as formReducer } from "redux-form";
import { AppData } from "../models";


const getID = () : string => {
  return Math.random().toString().slice(2);
};


export default function(state: AppData = data, action: Object) : AppData {
  let id : string = "";
  let users = usersReducer(state.users, action);

  if (!state.user) {
    id = getID();
    users = {
      ...users,
      [id] : { id, name: "User", picture:"assets/profile/default.png" }
    };
  }

  return {
    user: state.user ? state.user : id,
    users: users,
    sessions: sessionsReducer(state.sessions, action, state.activeSession),
    activeSession: state.activeSession,
    form: formReducer(state.form, action)
  };
}
