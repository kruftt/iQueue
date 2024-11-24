import { StyleSheet } from "react-native";

const styles: any = StyleSheet.create({
  container: {
    backgroundColor: "#FBFAFA",
  },
  row: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    alignItems: "center",
  },
  mt: {
    marginTop: 18,
  },
  activebutton: {
    backgroundColor: "darkgray",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  inactivebutton: {
    backgroundColor: "#777",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  backbutton: {
    borderColor: "grey",
    backgroundColor: "#FBFAFA",
  },
  backbuttontext: {
    color: "black",
  },
  header: {
    backgroundColor: "#f0eff4",
  },
});
export default styles;
