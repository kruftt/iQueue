// @flow
import * as React from "react";
import { connect } from "react-redux";
import { Text, Button, Subtitle } from "native-base";
import { StyleSheet, View, Dimensions } from "react-native";
import { Topic, Question, User } from "../models";
import { delayQuestion, addStudentToQuestion, removeStudentFromQuestion, removeQuestion,
         createQuestion, addVolunteerToTopic, removeVolunteerFromTopic } from "../actions";

const dheight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  mask: {
    position: "absolute",
    left: 0,
    top: 0,
    height: 0.6 * dheight,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.2)",
    zIndex: 2,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },

  panel: {
    position: "absolute",
    top: "5%",
    left: "5%",
    width: "90%",
    backgroundColor: "white",
    opacity: 1.0,
    padding: 12,
    borderRadius: 6
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

  stopvolunteering : {
    margin: 1,
    backgroundColor: "#f1c232"
  },

  cancel: {
    margin: 1,
    backgroundColor: "#777"
  },

});


export interface Props {
  topic: Topic;
  queue: Array<Question>;
  user: User;

  setTopic: Function;
  addStudentToQuestion: Function;
  removeStudentFromQuestion: Function;
  createQuestion: Function;
  addVolunteerToTopic: Function;
  removeVolunteerFromTopic: Function;
  removeQuestion: Function;
  delayQuestion: Function;
}

export interface State {
  currentQuestion: any;
  volunteering: boolean;
}


class TopicOverlay extends React.Component<Props, State> {
  constructor (props : Props) {
    super(props);
    const topic_id = this.props.topic.id;
    const student_id = this.props.user.id;
    const queue = this.props.queue;
    const volunteering = (this.props.topic.volunteers.indexOf(student_id) !== -1);

    for (let i = 0; i < queue.length; i++) {
      const question = queue[i];
      if (question.topic === topic_id && question.students.indexOf(student_id) !== -1 ) {
        this.state = { currentQuestion: question, volunteering };
        return this;
      }
    }

    this.state = { currentQuestion: null, volunteering };
    return this;
  }

  getEWTs() {
    const id = this.props.topic.id;
    const queue = this.props.queue;

    let group_ewt = 0, solo_ewt = 0;

    for (let i = 0; i < queue.length; i++) {
      const question = queue[i];
      if (question.topic === id) {
        if (question.students.length < question.maxSize) {
          group_ewt = question.ewt;
        }
      }
    }

    solo_ewt = queue[queue.length - 1].ewt + 6;
    group_ewt = (group_ewt ? group_ewt : solo_ewt);
    return { solo_ewt, group_ewt };
  }

  getHelp (solo : boolean) {
    const id = this.props.topic.id;
    const queue = this.props.queue;

    if (!solo) {
      for (let i = 0; i < queue.length; i++) {
        const question = queue[i];
        if (question.topic === id) {
          if (question.students.length < question.maxSize) {
            this.props.addStudentToQuestion(this.props.user.id, question);
            this.props.setTopic(null);
            return;
          }
        }
      }
    }

    this.props.createQuestion({
      topic: id,
      students: [ this.props.user.id ],
      ewt: 5,
      maxSize: solo ? 1 : 3
    });
    this.props.setTopic(null);
  }

  delayQuestion () {
    this.props.delayQuestion(this.state.currentQuestion);
    this.props.setTopic(null);
  }

  cancelQuestion () {
    const question = this.state.currentQuestion;
    const student_id = this.props.user.id;

    if (question.students.length === 1) {
      this.props.removeQuestion(question);
    } else {
      this.props.removeStudentFromQuestion(student_id, question);
    }
    this.props.setTopic(null);
  }


  volunteer () {
    this.props.addVolunteerToTopic(this.props.user.id, this.props.topic);
    this.props.setTopic(null);
  }

  stopVolunteering () {
    this.props.removeVolunteerFromTopic(this.props.user.id, this.props.topic);
    this.props.setTopic(null);
  }

  cancel () {
    this.props.setTopic(null);
  }

  render() {
    return (
      <View style={styles.mask} >
        <View style={styles.panel}>
          <Text style={{textAlign: "center", padding: 10, fontSize: 22, color: "black"}}>{this.props.topic.name}</Text>
          {
            (() => {
              if (this.state.currentQuestion) {
                if (this.props.queue.length !== (Math.floor(this.state.currentQuestion.ewt / 6) + 1 )) {
                  return (
                    <View>
                      <Button large block style={styles.stopvolunteering} onPress={() => this.delayQuestion()}>
                        <View style={{alignItems:"center"}}>
                        <Text>Delay Question</Text>
                        <Subtitle style={{color: "white"}}> move one place back in the queue </Subtitle>
                        </View>
                      </Button>
                      <Button large block style={styles.remove} onPress={() => this.cancelQuestion()}>
                        <View style={{alignItems:"center"}}>
                          <Text>Leave Question</Text>
                          <Subtitle style={{color: "white"}}> give up your place in the queue </Subtitle>
                        </View>
                      </Button>
                    </View>
                  );
                } else {
                  return (
                    <View>
                      <Button large block style={styles.remove} onPress={() => this.cancelQuestion()}>
                        <View style={{alignItems:"center"}}>
                          <Text>Leave Question</Text>
                          <Subtitle style={{color: "white"}}> give up your place in the queue </Subtitle>
                        </View>
                      </Button>
                    </View>
                  );
                }
              } else if (this.state.volunteering) {
                return (
                  <Button large block style={styles.stopvolunteering} onPress={() => this.stopVolunteering()}>
                    <View style={{alignItems:"center"}}>
                      <Text>Stop Volunteering</Text>
                      <Subtitle style={{color: "white"}}> stop offering help on this topic </Subtitle>
                    </View>
                  </Button>
                );
              } else {
                const { solo_ewt, group_ewt } = this.getEWTs();
                if (this.props.topic.id !== "Other") {
                  return (
                    <View>
                      <Button large block style={styles.group} onPress={() => this.getHelp(false)} key={"group"}>
                        <View style={{alignItems:"center"}}>
                          <Text>Group Queue</Text>
                          <Subtitle style={{color: "white"}}> {"Estimated Wait Time: " + group_ewt + " minutes"} </Subtitle>
                        </View>
                      </Button>
                      <Text style={{fontSize: 10, color: "gray", textAlign: "center", marginBottom: 3}}> Max size: 3. Helps you and your peers get help faster. </Text>
                      <Button large block style={styles.solo} onPress={() => this.getHelp(true)} key={"solo"}>
                        <View style={{alignItems:"center"}}>
                          <Text>Solo Queue</Text>
                          <Subtitle style={{color: "white"}}> {"Estimated Wait Time: " + solo_ewt + " minutes"} </Subtitle>
                          </View>
                      </Button>
                      <Button large block style={styles.volunteer} onPress={() => this.volunteer()} key={"volunteer"}>
                        <View style={{alignItems:"center"}}>
                          <Text>Volunteer</Text>
                          <Subtitle style={{color: "white"}}> Show others you can help with this topic </Subtitle>
                        </View>
                      </Button>
                    </View>
                  );
                } else {
                  return (
                    <View>
                      <Button large block style={styles.solo} onPress={() => this.getHelp(true)} key={"solo"}>
                        <View style={{alignItems:"center"}}>
                          <Text>Queue</Text>
                          <Subtitle style={{color: "white"}}> {"Estimated Wait Time: " + solo_ewt + " minutes"} </Subtitle>
                          </View>
                      </Button>
                    </View>
                  );
                }



              }
            })()
          }
          <Button large block style={styles.cancel} onPress={() => this.cancel()}>
            <Text>Cancel</Text>
          </Button>
        </View>
      </View>
    );
  }
}



function bindAction(dispatch) {
  return {
    addStudentToQuestion : (student, question) =>
      dispatch(addStudentToQuestion(student, question)),

    createQuestion : (question) =>
      dispatch(createQuestion(question)),

    delayQuestion : (question) =>
      dispatch(delayQuestion(question)),

    addVolunteerToTopic : (volunteer, topic) =>
      dispatch(addVolunteerToTopic(volunteer, topic)),

    removeStudentFromQuestion : (student, question) =>
      dispatch(removeStudentFromQuestion(student, question)),

    removeQuestion : (question) =>
      dispatch(removeQuestion(question)),

    removeVolunteerFromTopic : (volunteer, topic) =>
      dispatch(removeVolunteerFromTopic(volunteer, topic))
  };
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindAction)(TopicOverlay);
