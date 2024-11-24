// @flow
import * as React from "react";
import { connect } from "react-redux";
import { Form, Label, Input, Icon, Item, Button, Text } from "native-base";
import { Field, reduxForm } from "redux-form";
import Profile from "./Profile";
import { updateUser } from "../../actions";
import { User, AppData } from "../../models";


export interface Props {
  navigation: any;
  user: User;
  handleSubmit: Function;
}

export interface State {}


const submit = (props, data, dispatch) => {
  dispatch(updateUser({
    ...props.user,
    ...data
  }));
  props.navigation.navigate("Main");
};


const renderInput = ({ input, label, meta: { touched, error, warning }}) => {
  return (
    <Item>
      <Icon active name="person" />
      <Label>Name: </Label>
      <Input type="text" {...input} />
    </Item>
  );
};


class ProfileContainer extends React.Component<Props, State> {
  render() {
    const form = (
      <Form >
        <Field name="name" component={renderInput} />
        <Button block style={{backgroundColor:"darkgray", margin:10}} onPress={this.props.handleSubmit((data, dispatch) => submit(this.props, data, dispatch))} >
          <Text>Submit</Text>
        </Button>
      </Form>
    );

    return (
      <Profile navigation={this.props.navigation} loginForm={form} />
    );
  }
}


function bindAction(dispatch) {
  return {  };
}

const mapStateToProps = (state : AppData) => ({
  user : state.users[state.user],
  initialValues : {
    name: state.users[state.user].name
  }
});

const mapFieldsToProps = {
  form: "profile",
  enableReinitialize: true
};


export default connect(mapStateToProps, bindAction)(reduxForm(mapFieldsToProps)(ProfileContainer));
