// @flow
import * as React from "react";
import { ScrollView } from "react-native";
import AssistantButton from "./AssistantButton";
import QueueQuestion from "./QueueQuestion";
import { Question, User, Session } from "../models";

export interface Props {
  session: Session;
  user: User;
  users: {[user_id:string]: User};
  questionMap: {[topic_id:string] : Question};
  volunteerMap: {[topic_id:string] : boolean};
  setOverlayQuestion: Function;
}

export interface State {
}


class Queue extends React.Component<Props, State> {
  render() {
    return (
      <ScrollView style={{backgroundColor: "#FBFAFA"}} horizontal={true} >
        <AssistantButton
          assistant={this.props.users[this.props.session.assistants[0]]}
          toProfile={() => {}}
        />
        {
          this.props.session.queue.map((q : Question, i : number) =>
            <QueueQuestion
              key={q.topic + i}
              index={i + 1}
              question={q}
              mainstudent={this.props.users[q.students[0]]}
              topic={this.props.session.topics[q.topic]}
              onPress={()=>{this.props.setOverlayQuestion(q);}}
              active={(q.students.indexOf(this.props.user.id) !== -1)}
              volunteering={this.props.volunteerMap[q.topic]}
            />
          )
        }
      </ScrollView>
    );
  }
}


export default Queue;
