// @flow
import * as React from "react";
import { Text, Button } from "native-base";


export interface Props {
  name: Object;
  onPress: Function;
}

export interface State {}


const style = {
  borderColor: "grey",
  backgroundColor: "#FBFAFA",
};

const textstyle = {
  color: "black",
  textAlign: "center",
  textAlignVertical: "center"
};


class SessionButton extends React.Component<Props, State> {
  render() {
    return (
      <Button bordered small rounded style={style} onPress={this.props.onPress}>
        <Text style={textstyle} adjustsFontSizeToFit numberOfLines={1} >
          { this.props.name }
        </Text>
      </Button>
    );
  }
}

export default SessionButton;
