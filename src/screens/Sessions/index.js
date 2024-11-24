// @flow
import * as React from "react";
import { connect } from "react-redux";
import Sessions from "./Sessions";
import { User } from "../../models";

export interface Props {
  navigation: any;
  user: User;
}

export interface State {}


class SessionsContainer extends React.Component<Props, State> {
  render() {
    return (
      <Sessions navigation={this.props.navigation} user={this.props.user} />
    );
  }
}


function bindAction(dispatch) {
  return {
  };
}

const mapStateToProps = state => ({
  user: state.users[state.user]
});

export default connect(mapStateToProps, bindAction)(SessionsContainer);
