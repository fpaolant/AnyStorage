import React from "react";
import { StyleSheet, Text } from "react-native";
import MapView from 'react-native-maps';

import Page from "../components/Page";

function MapScreen(props) {

  //To get param passed from map
  const city = props.route.params.city
  return (
    <Page style={styles.container}>
      <Text style={styles.textcityname}>Map view in {city}</Text>
      <MapView style={styles.map}>
        {/* // LIST OF MARKERS
          this.state.markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))*/}
      </MapView>
    </Page>
  );
}

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0
  },
  textcityname: {
    textAlign: "center",
    backgroundColor: 'blue',
    color: '#fff'
  },
  map: {
    width: '100%',
    height: '100%',
  }
});
