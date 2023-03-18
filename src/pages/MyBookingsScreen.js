import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, FlatList, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from '@expo/vector-icons';
import Color from "../constants/Color";
import { getBookings } from "../actions";
import { resetBookings } from "../reducers/BookingsReducer";
import { sLoggedIn, sBookings } from "../selectors";
import Page from "../components/Page";
import Title from "../components/typo/Title";
import Booking from "../components/Booking";







function MyBookingsScreen({navigation}) {
  const dispatch = useDispatch();
  const loggedIn = useSelector(sLoggedIn);
  const bookings = useSelector(sBookings);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(function() {
    if (bookings == null || bookings.length === 0) {
      dispatch(getBookings());
    }
    return () => { // didUnmount
      dispatch(resetBookings());
    };
  }, [loggedIn]);




  const renderItem = ({item}) => {
    return <Booking booking={item} />;
  };
  const renderEmptyContent = () => {
    return <View style={styles.emptyContentContainer}>
              <Text style={{color: Color.muted}}>Non hai prenotazioni</Text>
              <Feather name="chevrons-down" size={48} color={Color.muted} />
              <Text style={{color: Color.muted}}>Scroll down per ricaricare</Text>
          </View>;
  };
  

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

      {loggedIn &&
        <FlatList
          data={bookings}
          renderItem={renderItem}
          keyExtractor={booking => booking.id}
          onRefresh={onRefresh}
          refreshing={refreshing}
          ListEmptyComponent={renderEmptyContent}
        />
      }
      {!loggedIn && 
        <TouchableOpacity
          style={styles.mainActionBtn}
          onPress={onLoginPress}
        >
          <Text style={{color: Color.white}}>Entra per visualizzarle</Text>
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
  emptyContentContainer: {
    marginTop: 100,  
    flexDirection: 'column', 
    gap: 10, 
    alignItems: 'center'
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
