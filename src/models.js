// @flow

/*
suggested overarching user workflow -
enter name (prepopulate from AsyncStorage)
select session from active sessions
join/create questions
*/


export interface User {
  name : string;
  id : string;
  picture: string;
}

export interface Topic {
  name : string;
  id : string;
  volunteers : Array<string>;
}

export interface Question {
  topic : string;
  students : Array<string>;
  ewt : number;
  maxSize : number;
}


export interface Session {
  name : string;
  queue : Array<Question>;
  topics: {[key:string]: Topic};
  assistants : Array<string>;
  students : Array<string>;
}


export interface AppData {
  user : string;
  users : {[key:string]: User};
  sessions : {[key:string]: Session};
  activeSession : string;
  form ?: any;
}
