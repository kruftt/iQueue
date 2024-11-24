// @flow
import * as React from "react";
import { Text, Button, Thumbnail, View } from "native-base";
import { Question, Topic, User } from "../models";


export interface Props {
  index: number;
  question: Question;
  topic: Topic;
  mainstudent: User;
  onPress: Function;
  active: boolean;
  volunteering: boolean;
}

export interface State {
}

const yellow = "#ffe599";
const white = "#FBFAFA";
const blue = "#6fa8dc";

let style = {
  marginLeft: 5,
  backgroundColor: null,
  borderWidth: 4,
  borderColor: "gray",
  width: 64,
  height: 64,
  borderRadius: 32
};

let smalltext = {
  fontSize: 10,
  color: "gray"
}

const IMAGES = {
    amy: require("./../../assets/profile/amy.png"),
    marc: require("./../../assets/profile/marc.png"),
    xinyi: require("./../../assets/profile/xinyi.png"),
    user: require("./../../assets/profile/user.png")
};


class QueueQuestion extends React.Component<Props, State> {

  render() {
    if (this.props.active || this.props.volunteering) {
      if (this.props.active) {
        style.borderColor = blue;
      } else {
        style.borderColor = yellow;
      }
    } else {
      style.borderColor = white;
    }
    return (
      <View style={{alignItems:"center"}}>
        <Text>{ this.props.index }</Text>
        <Button style={style} onPress={this.props.onPress}>
          <Thumbnail round source={IMAGES[this.props.mainstudent.id] ? IMAGES[this.props.mainstudent.id] : IMAGES.user}/>
        </Button>
        <Text>{this.props.question.topic}</Text>
        <Text style={smalltext}>{this.props.question.maxSize === 1? "1:1" : "group"}</Text>
      </View>
    );
  }
}

export default QueueQuestion;
