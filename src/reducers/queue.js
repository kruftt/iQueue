import actions from "../actions";
import questionReducer from "./question";
import { Question } from "../models";


const TIME_PER_QUESTION = 6;

const set_ewt = (q : Array<Question>) : Array<Question> => {
  let ewt = 3;
  for (const i in q) {
    q[i].ewt = ewt;
    ewt += TIME_PER_QUESTION;
  }
  return q;
};


export default function (queue: Array<Question>, action: Object) : Array<Question> {
  let index = 0;
  switch (action.type) {
    case actions.createQuestion:
      return set_ewt([
        ...queue,
        action.payload
      ]);


    case actions.removeQuestion:
      index = queue.indexOf(action.payload);
      return set_ewt([
        ...queue.slice(0, index),
        ...queue.slice(index + 1)
      ]);


    case actions.delayQuestion:
      index = queue.indexOf(action.payload);
      if (index === (queue.length - 1)) { return queue; }
      return set_ewt([
        ...queue.slice(0, index),
        queue[index + 1],
        queue[index],
        ...queue.slice(index + 2)
      ]);


    case actions.addStudentToQuestion:
    case actions.removeStudentFromQuestion:
      index = queue.indexOf(action.payload.question);

      return set_ewt([
        ...queue.slice(0, index),
        questionReducer(queue[index], action),
        ...queue.slice(index + 1)
      ]);


    default: return queue;
  }
}
