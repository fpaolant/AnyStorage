import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { sSelectedStorage, sCreateBookingDate, sCreateBookingQty, sCreateBookingDays, sLoggedIn } from '../selectors';
import { resetBookingForm, setBookingDate, setBookingDays, setBookingQty } from '../reducers/CreateBookingReducer';
import { addBooking } from '../actions';

import Page from '../components/Page';
import Title from '../components/typo/Title';
import Color from '../constants/Color';





export default function BookScreen({navigation}) {
  const dispatch = useDispatch();
  const selectedStorage = useSelector(sSelectedStorage);
  const loggedIn = useSelector(sLoggedIn);

  const datetime = useSelector(sCreateBookingDate);
  const date = new Date(datetime);
  const days = useSelector(sCreateBookingDays);
  const qty = useSelector(sCreateBookingQty);

 

  navigation.setOptions({
    title: selectedStorage.name,
  });

  const handleBookingQty = function(qty) {
    dispatch(setBookingQty(qty));
  }

  const handleBookingDays = function(days) {
    dispatch(setBookingDays(days));
  }

  const onChangeDate = (event, selectedDate) => {
    setShow(false);
    const selectedDateTime = selectedDate.getTime();
    dispatch(setBookingDate(selectedDateTime));
  };

  const onCreateBooking = () => {
    console.log("create booking")
    dispatch(addBooking(selectedStorage));
  }

  const onAccess = () => {
    navigation.navigate('Access');
  }


  const [show, setShow] = useState(false);

  const showDatePicker = function() {
    setShow(true)
  }

  


  return (
    <Page style={styles.container}>
      <Title text="Quando"></Title>      
      <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            onPressIn={showDatePicker}
            value={ datetime.toString()}
            textAlign='center'
            readOnly={true}
          />
          
      </View>
      {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display='calendar'
            locale='it-IT'
            minimumDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay())}
            onChange={onChangeDate}
          />
        )}

        <Title text="Quanti giorni"></Title>
        <View style={styles.inputView}>
        <TextInput
            style={styles.TextInput}
            placeholder="giorni"
            placeholderTextColor="#ddd"
            textAlign='center'
            value={days.toString()}
            maxLength={2}
            keyboardType="number-pad"
            onChangeText={handleBookingDays}
          />
      </View>



      <Title text="Quanti colli"></Title>
      <View style={styles.inputView}>
        <TextInput
            style={styles.TextInput}
            placeholder="numero di colli"
            placeholderTextColor="#ddd"
            textAlign='center'
            value={qty.toString()}
            maxLength={2}
            keyboardType="number-pad"
            onChangeText={handleBookingQty}
          />
      </View>

      <Title text="Importo Totale"></Title>
      <View style={styles.inputView}>
        <Text style={styles.amountText}>{qty*days*selectedStorage.price} €</Text>
      </View>
      
      {loggedIn && <TouchableOpacity
          style={styles.mainActionBtn}
          onPress={onCreateBooking}
        >
          <Text>PRENOTA ORA</Text>
        </TouchableOpacity>}

      {!loggedIn &&<TouchableOpacity
          style={styles.mainActionBtn}
          onPress={onAccess}
        >
          <Text>Entra per prenotare</Text>
        </TouchableOpacity>}
      
    </Page>
  );
}

const styles = StyleSheet.create({  
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  inputView: {
    height: 45,
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    width: "100%",
    borderColor: Color.lightGrey,
    borderWidth: 1,
    height: 50,
    flex: 1,
    padding: 10,
  },
  amountText: {
    fontSize: 30,
    fontWeight: 800,
    color: Color.green,
  },
  mainActionBtn: {
    width: "80%",
    backgroundColor: Color.primary,
    color: Color.white,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
}); 