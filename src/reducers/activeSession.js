// @flow
import actions from "../actions";
import queueReducer from "./queue";
import topicsReducer from "./topics";
import { Session } from "../models";


const assistantsReducer = (assistants: Array<string>, action: Object) : Array<string> => {
  switch (action.type) {
    case actions.addAssistantToSession:
    return [ ...assistants, action.payload ];

    case actions.removeAssistantFromSession:
    const index = assistants.indexOf(action.payload);
    return [
      ...assistants.slice(0,index),
      ...assistants.slice(index + 1)
    ];

    default: return assistants;
  }
};


const studentsReducer = (students: Array<string>, action: Object) : Array<string> => {
  switch (action.type) {
    case actions.addStudentToSession:
    return [ ...students, action.payload ];

    case actions.removeStudentFromSession:
    const index = students.indexOf(action.payload);
    return [
      ...students.slice(0,index),
      ...students.slice(index + 1)
    ];

    default: return students;
  }
};


export default function(state: Session, action: Object) : Session {
  return {
    name : state.name,
    assistants : assistantsReducer(state.assistants, action),
    students : studentsReducer(state.students, action),
    queue : queueReducer(state.queue, action),
    topics : topicsReducer(state.topics, action)
  };
}
