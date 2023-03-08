import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import Page from "../components/Page";
import Subtitle from "../components/typo/Title";
import InputHome from "../components/InputHome";
import { setPlaceName } from "../actions";
import { sSearchPlaceText } from "../selectors";
import Images from "../images";
import MyButton from "../components/MyButton";

function HomeScreen({ searchPlaceText, changeText }) {
  return (
    <Page style={styles.container}>
      <Image source={Images.Logo} style={styles.image} resizeMode={"contain"} />
      <Subtitle text="Trova lo Storage" />
      <InputHome 
          value={searchPlaceText} 
          handleChangeText={changeText} 
          placeholder="Città, indirizzo o location"
      />
      <MyButton text="trova" />
      <View style={styles.bottomView}>
        <MyButton text="Entra" />
        <MyButton text="Registrati" />
      </View>
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
  bottomView: {
    width: "100%",
    height: 70,
    justifyContent: "center",
    alignContent: "space-between",
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
  },
});
