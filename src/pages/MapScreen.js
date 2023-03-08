import React from "react";
import { StyleSheet, Text } from "react-native";
import Page from "../components/Page";

function MapScreen(props) {

  //To get param passed from map
  const city = props.route.params.city
  return (
    <Page style={styles.container}>
      <Text>Map view in {city}</Text>
    </Page>
  );
}

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  }
});
