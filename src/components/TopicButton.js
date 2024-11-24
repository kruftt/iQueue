// @flow
import * as React from "react";
import { Text, Button } from "native-base";


export interface Props {
  topic: Object;
  active: boolean;
  volunteering: boolean;
  setTopic: Function;
}

export interface State {}

const off = "darkgray";
const on = "gray";

const yellow = "#ffe599";
const green = "#6fa8dc";

let style = {
  margin:"1%",
  backgroundColor: on,
  borderWidth: 4,
  borderColor: green
};


class TopicButton extends React.Component<Props, State> {
  render() {
    if (this.props.active || this.props.volunteering) {
      style.backgroundColor = on;
      if (this.props.active) { style.borderColor = green; }
      else { style.borderColor = yellow; }
    } else {
      style.backgroundColor = off;
      style.borderColor = off;
    }

    return (
      <Button large style={style} onPress={() => this.props.setTopic(this.props.topic)} >
        <Text>{ this.props.topic.id }</Text>
      </Button>
    );
  }
}

export default TopicButton;
