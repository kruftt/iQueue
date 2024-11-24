//@flow
import { User, Question, Topic } from "./models";

const actions : Object = {
  // Users
  updateUser : "USER UPDATE",

  // Session
  addStudentToSession : "SESSION ADD_STUDENT",
  removeStudentFromSession : "SESSION REMOVE_STUDENT",
  addAssistantToSession : "SESSION ADD_ASSISTANT",
  removeAssistantFromSession : "SESSION REMOVE_ASSISTANT",

  // Queue
  createQuestion : "QUESTION CREATE",
  removeQuestion : "QUESTION REMOVE",
  delayQuestion : "QUESTION DELAY",

  // Questions
  addStudentToQuestion : "QUESTION ADD_STUDENT",
  removeStudentFromQuestion : "QUESTION REMOVE_STUDENT",

  // Topics
  addVolunteerToTopic : "TOPIC ADD_VOLUNTEER",
  removeVolunteerFromTopic : "TOPIC REMOVE_VOLUNTEER"
};

export default actions;


// Users

export function updateUser(user: User) : Object {
  return {
    type: actions.updateUser,
    payload: user
  };
}


// Session

export function addStudentToSession(student_id: string) : Object {
  return {
    type: actions.addStudentToSession,
    payload: student_id
  };
}

export function removeStudentFromSession(student_id: string) : Object {
  return {
    type: actions.removeStudentFromSession,
    payload: student_id
  };
}

export function addAssistantToSession(student_id: string) : Object {
  return {
    type: actions.addAssistantToSession,
    payload: student_id
  };
}

export function removeAssistantFromSession(student_id: string) : Object {
  return {
    type: actions.removeAssistantFromSession,
    payload: student_id
  };
}


// Queue

export function createQuestion(question: Question) : Object {
  return {
    type: actions.createQuestion,
    payload: question
  };
}

export function removeQuestion(question: Question) : Object {
  return {
    type: actions.removeQuestion,
    payload: question
  };
}

export function delayQuestion(question: Question) : Object {
  return {
    type: actions.delayQuestion,
    payload: question
  };
}


// Questions

export function addStudentToQuestion(student: string, question: Question) : Object {
  return {
    type: actions.addStudentToQuestion,
    payload: {
      student,
      question
    }
  };
}

export function removeStudentFromQuestion(student: string, question: Question) : Object {
  return {
    type: actions.removeStudentFromQuestion,
    payload: {
      student,
      question
    }
  };
}


// Topics 

export function addVolunteerToTopic(volunteer: string, topic: Topic) : Object {
  return {
    type: actions.addVolunteerToTopic,
    payload: {
      volunteer,
      topic
    }
  };
}

export function removeVolunteerFromTopic(volunteer: string, topic: Topic) : Object {
  return {
    type: actions.removeVolunteerFromTopic,
    payload: {
      volunteer,
      topic
    }
  };
}
