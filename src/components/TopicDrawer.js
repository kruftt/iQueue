// @flow
import * as React from "react";
import { View } from "react-native";
import { Text } from "native-base";
import Drawer from "react-native-drawer";
import TopicButton from "./TopicButton";
import TopicOverlay from "./TopicOverlay";
import { Session, Topic, User } from "../models";


export interface Props {
  user: User;
  session: Session;
  questionMap: {[topic_id:string] : boolean};
  volunteerMap: {[topic_id:string] : boolean};
  children: any;
}

export interface State {
  activeTopic : any;
}


const styles = {
  text: {
    textAlign: "center",
    marginTop:"4%",
    marginBottom:"4%",
    fontSize: 22,
    color : "black"
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    zIndex: 1
  }
};



class TopicDrawer extends React.Component<Props, State> {

  constructor(props : Props) {
    super(props);
    this.state = { activeTopic: null };
  }

  setTopic(topic : Topic) {
    this.setState({activeTopic: topic});
  }

  render() {
    return (
      <Drawer
        type={"overlay"}
        content={
          <View>
            {
              this.state.activeTopic &&
              <TopicOverlay
                topic={this.state.activeTopic}
                queue={this.props.session.queue}
                user={this.props.user}
                setTopic={(t) => this.setTopic(t)}
              />
            }
            <Text style={styles.text}>Questions</Text>
            <View style={styles.buttonView}>
              {
                Object.keys(this.props.session.topics).map((k,i) =>
                  <TopicButton key={k}
                    active={(this.props.questionMap[k]) ? true : false}
                    volunteering={this.props.volunteerMap[k]}
                    topic={this.props.session.topics[k]}
                    setTopic={(t) => this.setTopic(t)} />
                )
              }
            </View>
          </View>
        }
        initializeOpen={false}
        side={"bottom"}
        styles={{
          drawer: {
            backgroundColor: "#FBFAFA",
            borderWidth: 0.5,
            borderColor: "black",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16
          },
          drawerOverlay: {
          },
          main : {
          },
          mainOverlay: {
            opacity: 0.0,
            backgroundColor: "black"
          }}}
        openDrawerOffset={0.4}
        panCloseMask={0.45}
        closedDrawerOffset={0.08}
        panOpenMask={0.13}
        panThreshold={0.1}
        acceptTap={true}
        tapToClose={true}
        captureGesture={false}
        tweenHandler={(ratio) => ({
          mainOverlay: {
            opacity: (0.6 * ratio) }
        })}
      >
        {this.props.children}
      </Drawer>
    );
  }
}

export default TopicDrawer;
