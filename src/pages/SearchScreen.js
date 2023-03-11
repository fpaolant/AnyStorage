import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pressable, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Ionicons } from '@expo/vector-icons'; 

import { sSearchPlaceText } from "../selectors";
import { searchPlaceTextChange } from "../reducers/SearchPlaceReducer";

import Config from "../constants/Config"
import Color from "../constants/Color";
import Page from "../components/Page";







import Subtitle from "../components/typo/Subtitle";




function SearchScreen({ navigation }) {

  const dispatch = useDispatch();
  const placeName = useSelector(sSearchPlaceText);
  
  const onItemPress = (data, details = null) => {
    const city = data['structured_formatting']['main_text'];
    dispatch(searchPlaceTextChange(city));
    navigation.goBack();
    navigation.navigate('Map', {city});
  }

  const getLeftItem = function () {
    return (
      <Pressable 
        onPress={() => { navigation.goBack() }}>
        <Ionicons name="chevron-back" size={24} color={Color.blue} />
      </Pressable>
    )
  }
  
  return (
    <Page style={styles.container}>
      <Subtitle text="Scrivi il nome di una città"></Subtitle>
      <GooglePlacesAutocomplete
        //currentLocation={true}
        //currentLocationLabel='attorno a me'
        placeholder='citta, indirizzo'
        value={placeName}
        query={{
          key: Config.GAPIKEY,
          language: 'it', // language of the results
          components: 'country:it',
        }}
        minLength={3}
        debounce={400}
        fetchDetails={false}
        onPress={onItemPress}
        styles={ styles.autocompleteInput }
        renderLeftButton={getLeftItem}

        clearButtonMode={true}
        autoFocus={true}
       
      />
    </Page>
  );
}


export default SearchScreen;



const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    alignItems: "center"
  },
  contentContainer: {
    paddingVertical: 12
  },
  autocompleteInput : {
    textInputContainer: {
      width: '100%'
    },
    textInput: {
      height: 38,
      width: '100%',
      color: '#5d5d5d',
      fontSize: 25,
      fontWeight: 800,
      borderColor: Color.blue,
      borderBottomWidth: 2,
      borderRadius: 0
    },
    separator: {
      height: 0.5,
      backgroundColor: Color.blue,
    },
  }
});
