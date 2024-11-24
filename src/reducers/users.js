// @flow
import actions from "../actions";
import { User } from "../models";


export default function(users: {[key:string]: User}, action: Object) : {[key:string]: User} {
  switch (action.type) {
    case actions.updateUser:
      return {
        ...users,
        [action.payload.id]: action.payload
      };

    default: return users;
  }
}
