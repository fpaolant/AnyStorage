import React, { useCallback, useEffect } from "react";
import { StyleSheet, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Page from "../components/Page";
import { sUserInfo, sLoggedIn } from "../selectors";
import { getUserBookings } from "../services/firebase/Bookings";


const Item = ({storageName, datetime}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{storageName} {datetime}</Text>
  </View>
);



function MyBookingsScreen(props) {

  const loggedIn = useSelector(sLoggedIn);
  const userInfo = useSelector(sUserInfo);

  let bookings = [];

  useEffect(() => {
    /*getUserBookings(userInfo.uid)
    .then((docs) => {
      console.log("getUserBooks", docs)
       bookings = docs.map( (doc) => {
                    return { id: doc.id, ...doc.data()}
                  });
                  console.log(bookings);
    })
    .catch((err) => {
      console.log(err);
    });*/
  }, [userInfo, loggedIn]);



  

  return (
    <Page style={styles.container}>
      <Text>My Bookings</Text>
      {loggedIn && bookings.length>0 && <FlatList
        data={bookings}
        renderItem={({booking}) => <Item booking={booking} />}
        keyExtractor={booking => booking.id}
      />}
      {loggedIn && bookings.length===0 && <Text>Non hai prenotazioni</Text>}
      {!loggedIn && <Text>Non hai effettuato il login</Text>}
    </Page>
  );
}




export default MyBookingsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  }
});
