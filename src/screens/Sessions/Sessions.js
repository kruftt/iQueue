import * as React from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Left,
  Body,
  Right
} from "native-base";
import { User } from "../../models";
import styles from "./styles";


export interface Props {
  navigation: any;
  user: User;
}

export interface State {}


class Sessions extends React.Component<Props, State> {
  render() {
    return (
      <Container style={styles.container}>

        <Header style={styles.header}>
        <Left style={{ flex: 1 }} >
          <Button bordered small rounded style={styles.backbutton} onPress={() => this.props.navigation.navigate("Main")} >
            <Text style={styles.backbuttontext} >Back</Text>
          </Button>
        </Left>

        <Body style={{ flex: 1,  justifyContent: "center", alignItems: "center" }} >
          <Title style={{ color: "black" }}>Sessions</Title>
        </Body>

        <Right />
        </Header>


        <Content>
          <Button block style={styles.activebutton} onPress={() => this.props.navigation.navigate("Main")}>
            <Text>CS 147</Text>
          </Button>
          <Button block style={styles.inactivebutton}>
            <Text>CS 221</Text>
          </Button>
          <Button block style={styles.inactivebutton}>
            <Text>CS 448B</Text>
          </Button>
        </Content>

      </Container>
    );
  }
}

export default Sessions;
