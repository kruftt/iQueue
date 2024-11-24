// @flow
import * as React from "react";
import { Text, View, Body, Thumbnail, H1 } from "native-base";
import { Question } from "../models";
import { ListItem } from "native-base";


export interface Props {
  question: Question;
  setOverlayQuestion: Function;
  index: number;
}

export interface State {
}

const getPositionString = (position) => {
  const inline = " in line";
  switch (position) {
    case 1: return "1st" + inline;
    case 2: return "2nd" + inline;
    case 3: return "3rd" + inline;
    default: return position.toString() + "th" + inline;
  }
};

class QuestionBar extends React.Component<Props, State> {
  render() {
    return (
      <ListItem onPress={() => this.props.setOverlayQuestion(this.props.question)}>
        <Body><H1>{this.props.question.topic}</H1></Body>
        <Body><View style={{alignItems:"center"}}>
          <Thumbnail small source={require("./../../assets/time.png")}/>
          <Text style={{fontSize: 10, textAlign:"left"}}>{this.props.question.ewt + " minutes"}</Text>
        </View></Body>
        <Body><View style={{alignItems:"center"}}>
        <Thumbnail square small source={require("./../../assets/place.png")}/>
        <Text style={{fontSize: 10, textAlign:"left"}}>{getPositionString(this.props.index)}</Text>
        </View></Body>
        <Body><View style={{alignItems:"center"}}>
        <Thumbnail small square source={(this.props.question.maxSize === 1) ? require("./../../assets/solo.png") : require("./../../assets/group.png")}/>
        <Text style={{fontSize: 10, textAlign:"left"}}>{(this.props.question.maxSize === 1) ? "one-on-one" : this.props.question.students.length + "/" + (this.props.question.maxSize) + " full"}</Text>
        </View></Body>
      </ListItem>
    );
  }
}

export default QuestionBar;
