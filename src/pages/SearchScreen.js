import React from "react";
import { Text, Pressable, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";

import Page from "../components/Page";
import InputSearchPlace from "../components/InputSearchPlace";
import { setPlaceName } from "../actions";
import { sSearchPlaceText } from "../selectors";

function SearchScreen({ searchPlaceText, changeText, navigation }) {
  const data = [
    "Milano", 
    "Roma", 
    "Bologna"
  ];

  const onPressInHandle = (item) => {
    navigation.goBack();
    navigation.navigate('Map', {city: item});
  }
  
  const renderItem = ({item}) => {
    return (
        <Pressable onPressIn={ () => { onPressInHandle(item) } }>
            <Text>{item}</Text>
        </Pressable>
    )
  }
  
  
  
  return (
    <Page style={styles.container}>
      <InputSearchPlace 
          value={searchPlaceText} 
          handleChangeText={changeText} 
          placeholder="Città, indirizzo o location"
          autoFocus={true}
      />
      {data.length == 0 && (
        <Text>Prova con un altro criterio di ricerca</Text>
      )}
      {data.length > 0 && (
        <FlatList 
          contentContainerStyle={styles.contentContainer}
          data={data}
          renderItem={renderItem}
        />
      )}
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
const SearchScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);

export default SearchScreenContainer;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  contentContainer: {
    paddingVertical: 12
  }
});
