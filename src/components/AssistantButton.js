// @flow
import * as React from "react";
import { Text, Button, Body, Thumbnail, View } from "native-base";
import { User } from "../models";

export interface Props {
  assistant: User;
  toProfile: Function;
}

export interface State {}


const style = {
  backgroundColor: "#555",
  marginLeft: 5,
  width: 55,
  height: 55,
  borderRadius: 5
};

let smalltext = {
  fontSize: 10,
  color: "gray"
}

class AssistantButton extends React.Component<Props, State> {
  render() {
    return (
      <Body><View style={{alignItems:"center"}}>
      <Text>TA</Text>
      <Button style={style} onPress={() => this.props.toProfile()}>
        <Thumbnail square source={require("./../../assets/profile/andrew.jpg")}/>
      </Button>
      <Text>{ this.props.assistant.name }</Text>
      <Text style={smalltext}> </Text>
      </View></Body>
    );
  }
}

export default AssistantButton;
