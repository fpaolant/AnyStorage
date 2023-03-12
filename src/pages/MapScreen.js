import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from 'expo-location';
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";

import { sMapLocation, sMapRegion, sSearchPlaceText, sStorages, sSelectedStorage } from "../selectors";
import { mapLocationChange, mapRegionChange } from "../reducers/SearchPlaceReducer";
import { selectStorage } from "../reducers/StoragesReducer";
import { getStoragesInRegion } from "../actions/StoragesActions";

import Config from "../constants/Config"
import Images from "../images";
import Page from "../components/Page";
import BottomModalMap from "../components/BottomModalMap";



function MapScreen(props) {

  const city = useSelector(sSearchPlaceText);
  const region = useSelector(sMapRegion);
  const location = useSelector(sMapLocation);

  const dispatch = useDispatch();
  const storages = useSelector(sStorages);
  const selectedStorage = useSelector(sSelectedStorage);


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


  useEffect(() => {
    dispatch(getStoragesInRegion())
  }, [region, region!=Config.mapDefaultRegion]) 

  function onRegionChange(region) {
    //dispatch(mapRegionChange(region)); // too slow
  }

  function onStorageTap(storage) {
    console.log("pin id tapped:", storage.id)
    dispatch(selectStorage(storage));
  }

  

  return (
    <Page style={styles.container}>
      <Text style={styles.textcityname}>Map view in {city}</Text>
      
      <MapView
        style={styles.map}
        region={region}
        onRegionChange={onRegionChange}
        loadingEnabled={true}
      >
        { 
          storages.map((storage, index) => (
              <Marker
                key={index}
                coordinate={{ latitude : storage.latitude , longitude : storage.longitude }}
                onPress={()=>{ onStorageTap(storage) }}
                stopPropagation={true}
                image={Images.MapIcon}
              />
             )
        )}
      </MapView>
      {selectedStorage && 
        <BottomModalMap style={styles.storageContainer}>
          <Text style={styles.textcityname}>{selectedStorage.name}</Text>
        </BottomModalMap>
      }
    </Page>
  );
}

export default MapScreen;





const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  textcityname: {
    backgroundColor: 'blue',
    textAlign: "center",
    color: "#fff",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  storageContainer: {
    height: 180,
    paddingHorizontal: 10,
    paddingVertical: 8,
    position: "fixed",
    bottom: 200,
  }
});
