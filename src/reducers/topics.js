// @flow
import actions from "../actions";
import { Topic } from "../models";


const topicReducer = (topic : Topic, action: Object) : Topic => {
    switch (action.type) {
        case actions.addVolunteerToTopic:
          return {
            ...topic,
            volunteers: [ ...topic.volunteers, action.payload.volunteer ]
          };

        case actions.removeVolunteerFromTopic:
          const index = topic.volunteers.indexOf(action.payload.volunteer);
          return {
            ...topic,
            volunteers: [ ...topic.volunteers.slice(0,index),
                          ...topic.volunteers.slice(index + 1) ]
          };

        default: return topic;
    }
};


export default function(topics: {[key:string]: Topic}, action: Object) : {[key:string]: Topic} {
  switch (action.type) {
    case actions.addVolunteerToTopic:
    case actions.removeVolunteerFromTopic:
      return {
        ...topics,
        [action.payload.topic.id] : topicReducer(action.payload.topic, action)
      };

    default: return topics;
  }
}
