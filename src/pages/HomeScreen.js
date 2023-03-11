import React, {useEffect} from "react";
import { StyleSheet, Image, TextInput, Button } from "react-native";
import { connect, useSelector, useDispatch } from "react-redux";
import Page from "../components/Page";
import Subtitle from "../components/typo/Title";
import { setPlaceName, signOut } from "../actions";
import { sSearchPlaceText } from "../selectors";
import Images from "../images";
import { sLoggedIn } from "../selectors";

function HomeScreen({ navigation }) {

  const dispatch = useDispatch();


  const onPressInHandle = () => {
    //navigation.navigate('Geo');
    navigation.navigate('SearchPlace');
  }

  const onLoginPress = () => {
    navigation.navigate('Access');
  }

  const onLogoutPress = () => {
    dispatch(signOut());
  }

  const loggedIn = useSelector(sLoggedIn);

  useEffect(() => {
    navigation.setOptions({
      
      headerRight: () => (
        <Button onPress={loggedIn? onLogoutPress: onLoginPress} title={loggedIn? 'Esci': 'Entra'} />
      ),
    });
  }, [navigation, loggedIn]);




  return (
    <Page style={styles.container}>
      <Image source={Images.Logo} style={styles.image} resizeMode={"contain"} />
      <Subtitle text="Trova uno Storage" />
      <TextInput
            placeholder="Città, indirizzo o location"
            onPressIn={onPressInHandle}
            readOnly={true}
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
    marginTop: 50,
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
