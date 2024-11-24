// @flow
import actions from "../actions";
import { Question } from "../models";


export default function(question: Question, action: Object) : Question {
  let index = 0;
  switch (action.type) {
    case actions.addStudentToQuestion:
      return {
        ...question,
        students: [ ...question.students, action.payload.student ]
      };

    case actions.removeStudentFromQuestion:
      index = question.students.indexOf(action.payload.student);
      return {
        ...question,
        students: [ ...question.students.slice(0,index),
                    ...question.students.slice(index + 1) ]
      };

    default: return question;
  }
}
