import activeSessionReducer from "./activeSession";
import { Session } from "../models";


export default function (sessions: {[key:string]: Session}, action: Object, activeSession: string) : {[key:string]: Session} {
  return {
    ...sessions,
    [activeSession] : activeSessionReducer(sessions[activeSession], action)
  };
}
