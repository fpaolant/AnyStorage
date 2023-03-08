import React from "react";
import { StyleSheet, Image, TextInput } from "react-native";
import { connect } from "react-redux";
import Page from "../components/Page";
import Subtitle from "../components/typo/Title";
import { setPlaceName } from "../actions";
import { sSearchPlaceText } from "../selectors";
import Images from "../images";

function HomeScreen({ navigation }) {
  const onPressInHandle = () => {
    navigation.navigate('SearchPlace');
  }
  return (
    <Page style={styles.container}>
      <Image source={Images.Logo} style={styles.image} resizeMode={"contain"} />
      <Subtitle text="Trova lo Storage" />
      <TextInput
            placeholder="Città, indirizzo o location"
            onPressIn={onPressInHandle}
            style={styles.input}
        />
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

//export default HomeScreen;
const HomeScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

export default HomeScreenContainer;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    height: 150,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#d1d1d1',
    minWidth: 200,
    padding: 20,
    width: '100%'
  }
});
