import React from "react";
import { StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import Page from "../components/Page";
import { setPlaceName } from "../actions";
import { sSearchPlaceText } from "../selectors";

function MyBookingsScreen(props) {
  return (
    <Page style={styles.container}>
      <Text>My Bookings</Text>
    </Page>
  );
}

function mapStateToProps(state) {
  return {
    searchPlaceText: sSearchPlaceText(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeText(searchPlaceText) {
      dispatch(setPlaceName(searchPlaceText));
    },
  };
}

//export default SearchScreen;
const MyBookingsScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyBookingsScreen);

export default MyBookingsScreenContainer;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  }
});
