import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, FlatList, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Color from "../constants/Color";
import { getBookings } from "../actions";
import { resetBookings } from "../reducers/BookingsReducer";
import { sLoggedIn, sBookings } from "../selectors";
import Page from "../components/Page";
import Title from "../components/typo/Title";



const Item = ({booking}) => {
  //console.log("item booking",booking)
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{booking.item.storageName}</Text>
    </View>
  )
};



function MyBookingsScreen({navigation}) {
  const dispatch = useDispatch();
  const loggedIn = useSelector(sLoggedIn);
  const bookings = useSelector(sBookings);

  const [refreshing, setRefreshing] = useState(false);

  navigation.setOptions({
    title: '',
  });

  useFocusEffect(useCallback(function() {
    if (bookings == null || bookings.length === 0) {
      dispatch(getBookings());
    }
    return () => { // didUnmount
      dispatch(resetBookings());
    };
  }, []));

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(resetBookings());
    dispatch(getBookings());
    setRefreshing(false);
  }

  const onLoginPress = () => {
    navigation.navigate('Access');
  }
  

  return (
    <Page style={styles.container}>
      <Title text="Le mie prenotazioni"></Title>

      {loggedIn && bookings.length>0 && 
        <FlatList
        data={bookings}
        renderItem={(booking) => <Item booking={booking} />}
        keyExtractor={booking => booking.id}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />}
      {loggedIn && bookings.length===0 && <Text>Non hai prenotazioni</Text>}
      {!loggedIn && 
        <TouchableOpacity
          style={styles.mainActionBtn}
          onPress={onLoginPress}
        >
          <Text>Entra per visualizzarle</Text>
        </TouchableOpacity>
      
      }
    </Page>
  );
}




export default MyBookingsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 30
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 32,
  },
  mainActionBtn: {
    width: "80%",
    backgroundColor: Color.primary,
    color: Color.white,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  }
});
