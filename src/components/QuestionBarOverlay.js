// @flow
import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Text, Button, H1, Body, List, ListItem, Thumbnail, Separator, Subtitle} from "native-base";
import { connect } from "react-redux";
import { delayQuestion, removeQuestion, removeStudentFromQuestion, addStudentToQuestion,
         addVolunteerToTopic, removeVolunteerFromTopic } from "../actions";
import { Question, Topic, User } from "../models";

const dheight = Dimensions.get("window").height;


export interface Props {
  question: Question;
  topic: Topic;
  user: User;
  users: {[id:string]:User};
  close: Function;
  userQuestionOnTopic: Question;
  queueLength: number;
  volunteering: boolean;
  delayQuestion: Function;
  removeQuestion: Function;
  removeStudentFromQuestion: Function;
  addStudentToQuestion: Function;
  addVolunteerToTopic: Function;
  removeVolunteerFromTopic: Function;
}

export interface State {}

const spacing = {
  top: "10%",
  left: "8%",
  right: "92%",
  bottom: "90%",
  width: "84%",
  height: "80%"
};

const mask = {
  position: "absolute",
  zIndex: 2,
  borderRadius: 0
};

const styles = StyleSheet.create({
  left_mask: {
    ...mask,
    left: 0,
    top: 0,
    height: spacing.bottom,
    width: spacing.left,
  },
  top_mask: {
    ...mask,
    left: spacing.left,
    top: 0,
    height: spacing.top,
    width: spacing.right,
  },
  right_mask: {
    ...mask,
    left: spacing.right,
    top: spacing.top,
    height: spacing.bottom,
    width: spacing.left,
  },
  bottom_mask: {
    ...mask,
    left: 0,
    top: spacing.bottom,
    height: spacing.top,
    width: spacing.right
  },

  panel: {
    position: "absolute",
    top: spacing.top,
    left: spacing.left,
    width: spacing.width,
    height: spacing.height,
    backgroundColor: "white",
    opacity: 1.0,
    padding: 16,
    borderRadius: 10,
    zIndex: 3,
  },

  infoType: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 12
  },
  info: {
    textAlign: "center"
  },

  remove: {
    margin: 1,
    backgroundColor: "#8F4B4B"
  },

  solo: {
    margin: 1,
    backgroundColor: "#6fa8dc"
  },

  group: {
    margin: 1,
    backgroundColor: "#6fa8dc"
  },

  volunteer: {
    margin: 1,
    backgroundColor: "#f1c232"
  },

  stopVolunteering : {
    margin: 1,
    backgroundColor: "#f1c232"
  },

  cancel: {
    margin: 1,
    backgroundColor: "#777"
  },
});

const getPositionString = (position) => {
  const inline = " in line";
  switch (position) {
    case 1: return "1st" + inline;
    case 2: return "2nd" + inline;
    case 3: return "3rd" + inline;
    default: return position.toString() + "th" + inline;
  }
};

const IMAGES = {
    amy: require("./../../assets/profile/amy.png"),
    marc: require("./../../assets/profile/marc.png"),
    xinyi: require("./../../assets/profile/xinyi.png"),
    user: require("./../../assets/profile/user.png")
};

class QuestionBarOverlay extends React.Component<Props, State> {
  delayQuestion () {
    this.props.delayQuestion(this.props.question);
    this.props.close();
  }

  leaveQuestion () {
    const question = this.props.question;
    if (question.students.length === 1) {
      this.props.removeQuestion(question);
    } else {
      this.props.removeStudentFromQuestion(this.props.user.id, question);
    }
    this.props.close();
  }

  stopVolunteering () {
    this.props.removeVolunteerFromTopic(this.props.user.id, this.props.topic);
    this.props.close();
  }

  joinQuestion () {
    this.props.addStudentToQuestion(this.props.user.id, this.props.question);
    this.props.close();
  }

  volunteer () {
    this.props.addVolunteerToTopic(this.props.user.id, this.props.topic);
    this.props.close();
  }


render() {
    return (
      <View style={{position:"absolute",top:0,left:0,height:dheight,width:"100%",backgroundColor:"rgba(0,0,0,0.3)",zIndex:2}} >
        <Button transparent style={styles.left_mask} onPress={this.props.close} />
        <Button transparent style={styles.right_mask} onPress={this.props.close} />
        <Button transparent style={styles.top_mask} onPress={this.props.close} />
        <Button transparent style={styles.bottom_mask} onPress={this.props.close} />

        <View style={styles.panel}>
          <H1 style={styles.info}> { this.props.topic.name } </H1>
          <List>
            <ListItem>
              <Body><View style={{alignItems:"center"}}>
                <Thumbnail small source={require("./../../assets/time.png")}/>
                <Text style={{fontSize: 10, textAlign:"left"}}>{this.props.question.ewt + " minutes"}</Text>
              </View></Body>
              <Body><View style={{alignItems:"center"}}>
                  <Thumbnail square small source={require("./../../assets/place.png")}/>
                  <Text style={{fontSize: 10, textAlign:"left"}}>{getPositionString(Math.floor(this.props.question.ewt / 6) + 1)}</Text>
              </View></Body>
              <Body><View style={{alignItems:"center"}}>
                  <Thumbnail small square source={(this.props.question.maxSize === 1) ? require("./../../assets/solo.png") : require("./../../assets/group.png")}/>
                  <Text style={{fontSize: 10, textAlign:"left"}}>{(this.props.question.maxSize === 1) ? "one-on-one" : this.props.question.students.length + "/" + (this.props.question.maxSize) + " full"}</Text>
              </View></Body>
            </ListItem>
            <Separator bordered>
            <Text>{this.props.question.maxSize === 1 ? "GETTING HELP" : "STUDENTS GETTING HELP IN THIS GROUP"}</Text>
            </Separator>
            <ListItem>
            {
              this.props.question.students.map((v)=>{
                return (
                  <View style={{alignItems:"center", marginLeft:4}} key={v} >
                    <Thumbnail round source={IMAGES[this.props.users[v].id] ? IMAGES[this.props.users[v].id] : IMAGES.user}/>
                    <Text style={{fontSize: 10, textAlign:"left"}}>{this.props.users[v].name}</Text>
                  </View>
                );
              })
            }
            </ListItem>
            { this.props.topic.id !== "Other" ?
              <Separator bordered>
              <Text>VOLUNTEERING TO HELP WITH { this.props.topic.name.toUpperCase() }</Text>
              </Separator> : null
            }
            { this.props.topic.id !== "Other" ?
              <ListItem>
                {
                  this.props.topic.volunteers.map((v)=>{
                    return (
                      <View style={{alignItems:"center", marginLeft:4}} key={v}>
                        <Thumbnail round source={IMAGES[this.props.users[v].id] ? IMAGES[this.props.users[v].id] : IMAGES.user}/>
                        <Text style={{fontSize: 10, textAlign:"left"}}>{this.props.users[v].name}</Text>
                      </View>
                    );
                  })
                }
              </ListItem> : null
              }
            </List>
          {
            (() => {
              const question = this.props.question;
              if (this.props.userQuestionOnTopic) {
                if (question === this.props.userQuestionOnTopic) {
                  // this question
                  if ((this.props.queueLength) !== (Math.floor(this.props.question.ewt / 6) + 1 )) {
                    return (
                      <View style={{marginTop: "auto"}}>
                        <Button block style={styles.stopVolunteering} onPress={() => this.delayQuestion()}>
                          <View style={{alignItems:"center"}}>
                          <Text>Delay Question</Text>
                          <Subtitle style={{color: "white"}}> move one place back in the queue </Subtitle>
                          </View>
                        </Button>
                        <Button block style={styles.remove} onPress={() => this.leaveQuestion()}>
                          <View style={{alignItems:"center"}}>
                          <Text>Leave Question</Text>
                          <Subtitle style={{color: "white"}}> give up your place in the queue </Subtitle>
                          </View>
                        </Button>
                      </View>);
                  } else {
                    return (
                      <View style={{marginTop: "auto"}}>
                        <Button block style={styles.remove} onPress={() => this.leaveQuestion()}>
                          <View style={{alignItems:"center"}}>
                          <Text>Leave Question</Text>
                          <Subtitle style={{color: "white"}}> give up your place in the queue </Subtitle>
                          </View>
                        </Button>
                      </View>);
                  }
                } else {
                  // other question
                  return (
                    <View style={{marginTop: "auto", alignItems:"center"}}>
                      <Text>Already in the queue for {this.props.topic.name}.</Text>
                      <Text>Estimated wait time: { this.props.userQuestionOnTopic.ewt} minutes.</Text>
                    </View>
                  );
                }
              } else {
                if (this.props.volunteering) {
                  // is volunteering
                  return (
                    <View style={{marginTop: "auto"}}>
                      <Button block style={styles.stopVolunteering} onPress={() => this.stopVolunteering()}>
                        <View style={{alignItems:"center"}}>
                        <Text>Stop Volunteering</Text>
                        <Subtitle style={{color: "white"}}> stop offering help on {this.props.topic.name} </Subtitle>
                        </View>
                      </Button>
                    </View>
                  );
                } else {
                  // not volunteering
                  if (question.students.length < question.maxSize) {
                    // room in question
                    return (
                      <View style={{marginTop: "auto"}}>
                        <Button block style={styles.group} onPress={() => this.joinQuestion()}>
                          <View style={{alignItems:"center"}}>
                          <Text>Join</Text>
                          <Subtitle style={{color: "white"}}> get helped with this group on {this.props.topic.name}  </Subtitle>
                          </View>
                        </Button>
                        <Button block style={styles.volunteer} onPress={() => this.volunteer()}>
                          <View style={{alignItems:"center"}}>
                          <Text>Volunteer</Text>
                          <Subtitle style={{color: "white"}}> show others you can help with {this.props.topic.name} </Subtitle>
                          </View>
                        </Button>
                      </View>
                    );
                  } else {
                    // no room
                    if (this.props.volunteering) {
                      return (
                        <View style={{marginTop: "auto"}}>
                          <Text style={{marginBottom: 12, textAlign: "center"}}>Question Full!</Text>
                          <Button block style={styles.stopVolunteering} onPress={() => this.stopVolunteering()}>
                            <View style={{alignItems:"center"}}>
                            <Text>Stop Volunteering</Text>
                            <Subtitle style={{color: "white"}}> stop offering help on {this.props.topic.name} </Subtitle>
                            </View>
                          </Button>
                        </View>
                      );
                    } else {
                      return (
                        <View style={{marginTop: "auto"}}>
                          <Text style={{marginBottom: 12, textAlign: "center"}}>Question Full!</Text>
                          <Button block style={styles.volunteer} onPress={() => this.volunteer()}>
                            <View style={{alignItems:"center"}}>
                            <Text>Volunteer</Text>
                            <Subtitle style={{color: "white"}}> show others you can help with {this.props.topic.name}</Subtitle>
                            </View>
                          </Button>
                        </View>
                      );
                    }
                  }
                }
              }
            })()
          }
          </View>
      </View>
    );
  }
}



function bindAction(dispatch) {
  return {
    delayQuestion : (question) =>
    dispatch(delayQuestion(question)),

    removeQuestion : (question) =>
    dispatch(removeQuestion(question)),

    removeStudentFromQuestion: (student, question) =>
      dispatch(removeStudentFromQuestion(student, question)),

    addStudentToQuestion: (student, question) =>
      dispatch(addStudentToQuestion(student, question)),

    addVolunteerToTopic: (volunteer, topic) =>
      dispatch(addVolunteerToTopic(volunteer, topic)),

    removeVolunteerFromTopic: (volunteer, topic) =>
      dispatch(removeVolunteerFromTopic(volunteer, topic))

  };
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindAction)(QuestionBarOverlay);
