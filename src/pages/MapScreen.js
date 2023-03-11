import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import * as Location from 'expo-location';
import MapView from "react-native-maps";


import { sMapLocation, sMapRegion, sSearchPlaceText } from "../selectors";
import { useDispatch, useSelector } from "react-redux";
import { mapLocationChange, mapRegionChange } from "../reducers/SearchPlaceReducer";

import Page from "../components/Page";
import Config from "../constants/Config"



function MapScreen(props) {

  const city = useSelector(sSearchPlaceText);
  const region = useSelector(sMapRegion);
  const location = useSelector(sMapLocation);

  const dispatch = useDispatch();


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      //let location = await Location.getCurrentPositionAsync({});
      let locations = await Location.geocodeAsync(city);
      
      if(locations && locations.length>0) {
        const {latitude, longitude} = locations[0];
        const {latitudeDelta, longitudeDelta} = Config.mapSearchDelta;
        dispatch(mapLocationChange({latitude, longitude}));
        dispatch(mapRegionChange({latitude, longitude, latitudeDelta, longitudeDelta}));
      }
    
    })();
  }, [city]);

  function onRegionChange(region) {
    //dispatch(mapRegionChange(region)); // too slow
  }

  

  return (
    <Page style={styles.container}>
      <Text style={styles.textcityname}>Map view in {city}</Text>
      <MapView
        style={styles.map}
        region={region}
        onRegionChange={onRegionChange}
      >
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
    paddingHorizontal: 0,
  },
  textcityname: {
    textAlign: "center",
    backgroundColor: "blue",
    color: "#fff",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
