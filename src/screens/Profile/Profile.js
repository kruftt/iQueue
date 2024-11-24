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
  Right,
  View
} from "native-base";
import { Image } from "react-native";
import styles from "./styles";


export interface Props {
  navigation: any;
  loginForm: any;
}

export interface State {}


class Profile extends React.Component<Props, State> {
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
            <Title style={{ color: "black" }}>Profile</Title>
          </Body>

          <Right />
        </Header>

        <Content>
          <View style={{alignItems: "center"}}>
            <Image style={styles.image} source={require("./../../../assets/profile/user.png")}/>
          </View>
          { this.props.loginForm }
        </Content>

      </Container>
    );
  }
}

export default Profile;
