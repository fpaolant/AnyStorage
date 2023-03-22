import React, {useEffect} from "react";
import { StyleSheet, Image, TextInput, Button, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Page from "../components/Page";
import Subtitle from "../components/typo/Title";
import RapidCitySelection from "../components/RapidCitySelection";
import Images from "../images";
import { signOut } from "../actions";
import { sLoggedIn } from "../selectors";
import Color from "../constants/Color";




function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const onPressInHandle = () => {
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
              style={styles.input}
              placeholder="Città, indirizzo o location"
              onPressIn={onPressInHandle}
              readOnly={true}
          />
        <Text style={styles.destinationsTitle}>Destinazioni principali</Text>
        <RapidCitySelection />
    </Page>
  );
}



export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    marginTop: 30,
    height: 150,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: Color.lightGrey,
    padding: 20,
    width: '100%',
    textAlign: 'center'
  },
  destinationsTitle: {
    marginTop: 30,
    fontSize: 16,
    fontWeight: 600,
    color: Color.darkBlue
  }
});
