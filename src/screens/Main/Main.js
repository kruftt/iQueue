import * as React from "react";
import { Container, Header, Content, Left, Body, Right, List, ListItem, Text , Separator, Thumbnail, H1, Button} from "native-base";
import styles from "./styles";
import { Queue, QuestionBar, TopicDrawer, SessionButton, ProfileButton, QuestionBarOverlay } from "../../components";
import { Session, User, Topic, Question } from "../../models";
import { View } from "react-native";


export interface Props {
  navigation: any;
  session: Session;
  user: User;
  users: {[user_id:string]: User};
}

export interface State {
  overlayQuestion: any;
}


class Main extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props);
    this.state = { overlayQuestion: null };
  }

  setOverlayQuestion (question: Question) {
    this.setState({ overlayQuestion: question });
  }

  getMaps () {
    const user_id = this.props.user.id;
    const session = this.props.session;

    const questionMap = session.queue.reduce((atm, question : Question) => {
      const index = question.students.indexOf(user_id);
      if (atm[question.topic]) { return atm; }
      if (index !== -1) { atm[question.topic] = question; }
      return atm;
    }, {});

    const volunteerMap = Object.keys(session.topics).reduce((vm, key) => {
      const topic : Topic = session.topics[key];
      if (topic.volunteers.indexOf(user_id) !== -1) {vm[key] = true;}
      return vm;
    }, {});

    return { questionMap, volunteerMap };
  }

  render() {
    const { questionMap, volunteerMap } = this.getMaps();
    let inqueue = false;

    return (
      <View style={styles.wrapper} >
        {
          this.state.overlayQuestion &&
          <QuestionBarOverlay
            question={ this.state.overlayQuestion }
            topic={ this.props.session.topics[this.state.overlayQuestion.topic] }
            user={ this.props.user }
            users={ this.props.users }
            close={ () => this.setOverlayQuestion(null) }
            queueLength={this.props.session.queue.length}
            volunteering={ volunteerMap[this.state.overlayQuestion.topic] }
            userQuestionOnTopic={ questionMap[this.state.overlayQuestion.topic] }
          />
        }
        <TopicDrawer
          user={this.props.user}
          session={this.props.session}
          questionMap={questionMap}
          volunteerMap={volunteerMap}
        >
          <Container style={styles.container}>

            <Header style={styles.header}>
              <Left style={{ flex: 1 }} >
                <SessionButton
                  name = { this.props.session.name }
                  onPress = { () => this.props.navigation.navigate("Sessions") }
                />
              </Left>

              <Body style={{ flex: 1,  justifyContent: "center", alignItems: "center" }} >
                <Thumbnail round small
                  source={require("./../../../assets/iqueue_logo.png")}/>
              </Body>

              <Right style={{ flex: 1 }} >
                <ProfileButton
                  onPress = { () => this.props.navigation.navigate("Profile") }
                  name = { this.props.user.name }
                />
              </Right>
            </Header>

            <Content style={{backgroundColor:"#f0eff4"}}>

              <View style={styles.spacer} />
                <Queue
                  session={this.props.session}
                  user={this.props.user}
                  users={this.props.users}
                  questionMap={questionMap}
                  volunteerMap={volunteerMap}
                  setOverlayQuestion={ (q) => this.setOverlayQuestion(q) }
                />
              <View style={styles.spacer} />

              <Separator bordered>
                    <Text>GETTING HELP ON</Text>
              </Separator>
              <List style={{backgroundColor: "#FBFAFA"}}>
                {
                  this.props.session.queue.map((q : Question, i) => {
                    if (q.students.indexOf(this.props.user.id) !== -1) {
                      inqueue = true;
                      return <QuestionBar
                                key={q.topic + i}
                                question={q}
                                setOverlayQuestion={(v) => this.setOverlayQuestion(v)}
                                index={i + 1}
                              />;
                    }
                  })
                }
                {
                  (!inqueue) && (
                    <ListItem>
                      <Text> Tap "Questions" below to join the queue. </Text>
                    </ListItem>
                  )
                }
              </List>
              <Separator bordered>
                    <Text>HELPING WITH</Text>
              </Separator>
              <List style={{backgroundColor: "#FBFAFA"}}>
              <ListItem>
                {
                  (Object.keys(volunteerMap).length > 0) ?
                    Object.keys(volunteerMap).map((v) =>
                      {
                        return <Button style={styles.volunteerbutton} key={v}>
                        <H1>{v}</H1>
                        </Button>
                      }
                    ):
                    <Text style={styles.footertext}>Tap "Questions" below to volunteer your help.</Text>
                }
              </ListItem>
              </List>
            </Content>
          </Container>
        </TopicDrawer>
      </View>
    );
  }
}

export default Main;
