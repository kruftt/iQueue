// @flow
import React from "react";
import { StackNavigator } from "react-navigation";
import { Animated, Easing } from "react-native";
import { Root } from "native-base";
import Main from "./screens/Main";
import Profile from "./screens/Profile";
import Sessions from "./screens/Sessions";


const App = StackNavigator(
  {
    Main: {screen: Main },
    Profile: {screen: Profile },
    Sessions: {screen: Sessions}
  },
  {
    initialRouteName: "Main",
    headerMode: "none",
    transitionConfig : () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
    }),
  }
);

export default () => (
  <Root>
    <App />
  </Root>
);
