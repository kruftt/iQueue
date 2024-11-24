// @flow

import { User, Session, Topic, Question, AppData } from "./models";

export const users : {[key:string]:User} = {
  andrew : {
    name : "Andrew",
    id : "andrew",
    picture : "assets/profile/andrew.jpg"
  },

  xinyi : {
    name : "Xinyi",
    id : "xinyi",
    picture : "assets/profile/xinyi.png"
  },

  amy : {
    name : "Amy",
    id : "amy",
    picture : "assets/profile/amy.jpg"
  },

  marc : {
    name : "Marc",
    id : "marc",
    picture : "assets/profile/marc.png"
  }
};


export const topics : {[key:string]:Topic} = {
  P1 : {
    name : "Problem 1",
    id : "P1",
    volunteers : ["marc"]
  },

  P2 : {
    name : "Problem 2",
    id : "P2",
    volunteers : ["xinyi", "amy"]
  },

  P3 : {
    name : "Problem 3",
    id : "P3",
    volunteers : [ "amy" ]
  },

  P4 : {
    name : "Problem 4",
    id : "P4",
    volunteers : ["marc", "amy", "xinyi"]
  },

  P5 : {
    name : "Problem 5",
    id : "P5",
    volunteers : ["xinyi"]
  },

  C1 : {
    name : "Concept 1",
    id : "C1",
    volunteers : []
  },

  Other : {
    name : "Other questions",
    id : "Other",
    volunteers : []
  }
};


export const questions : Array<Question> = [
  {
    topic : "P2",
    students : ["marc"],
    ewt : 4,
    maxSize : 3
  },
  {
    topic : "P1",
    students : ["amy"],
    ewt : 10,
    maxSize : 1
  },
  {
    topic : "P3",
    students : ["xinyi", "marc"],
    ewt : 10,
    maxSize : 3
  }
];


const CS147 : Session = {
  name : "CS 147",
  assistants : ["andrew"],
  students : ["xinyi", "amy", "marc"],
  queue : questions,
  topics : topics
};

const CS221 : Session = {
  name : "CS 221",
  assistants : ["xinyi"],
  students : ["andrew", "amy", "marc"],
  queue: questions,
  topics: topics
};

export const sessions : {[key:string]:Session} = {
  "CS 147" : CS147,
  "CS 221" : CS221
};


export const activeSession = "CS 147";


const state : AppData = {
  user : "",
  users,
  sessions,
  activeSession
};

export default state;
