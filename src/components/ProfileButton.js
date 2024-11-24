// @flow
import * as React from "react";
import { Button, Thumbnail, View } from "native-base";


export interface Props {
  name: Object;
  onPress: Function;
}

export interface State {}


const style = {
  backgroundColor: "black",
  borderColor:"grey",
  borderWidth: 0.5,
  width: 37,
  height: 37,
  borderRadius: 18.5
};

class ProfileButton extends React.Component<Props, State> {
  render() {
    return (
      <View style={{alignItems: "center"}}>
      <Button style={style} onPress={this.props.onPress}>
        <Thumbnail round small source={require("./../../assets/profile/user.png")}/>
      </Button>
      </View>
    );
  }
}

export default ProfileButton;
