import * as React from "react";
import { Container, Header, Title, Content, Text, Button, Icon, Left, Right, Body } from "native-base";
import Drawer from "react-native-drawer";

import styles from "./styles";
export interface Props {
	navigation: any;
}
export interface State {}
class BlankPage extends React.Component<Props, State> {
	render() {
		const param = this.props.navigation.state.params;
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="ios-arrow-back" />
						</Button>
					</Left>

					<Body style={{ flex: 3 }}>
						<Title>{param ? param.name.item : "Blank Page"}</Title>

					</Body>

					<Right />
				</Header>

				<Content>
                <Drawer
                    content={<Text>questions</Text>}
                    initializeOpen={false}
                    side={"bottom"}
                    openDrawerOffset={0.5}
                    closedDrawerOffset = {0.1}
                    styles={{drawer:{backgroundColor: "darkgrey", borderTopRightRadius: 25}}}
                    panThreshold={0}
				/>
				</Content>
			</Container>
		);
	}
}

export default BlankPage;
