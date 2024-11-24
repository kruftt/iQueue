// @flow
import * as React from "react";
import { connect } from "react-redux";
import Main from "./Main";
import { User, Session } from "../../models";

export interface Props {
  user: User;
  users: {[user_id:string]: User};
  session: Session;
  navigation: any;
}

export interface State {}


class MainContainer extends React.Component<Props, State> {
  render() {
    return (
      <Main
        user = { this.props.user }
        users = { this.props.users }
        session = { this.props.session }
        navigation = { this.props.navigation }
      />
    );
  }
}


function bindAction(dispatch) { return { }; }

const mapStateToProps = state => ({
  user: state.users[state.user],
  users: state.users,
  session: state.sessions[state.activeSession]
});

export default connect(mapStateToProps, bindAction)(MainContainer);
