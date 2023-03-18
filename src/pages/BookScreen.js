import React, { useEffect, useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { sSelectedStorage, sCreateBookingDate, sCreateBookingQty, sCreateBookingDays, sLoggedIn } from '../selectors';
import { setBookingDate, addBookingDays, subBookingDays, addBookingQty, subBookingQty } from '../reducers/CreateBookingReducer';
import { addBooking } from '../actions';

import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import Page from '../components/Page';
import Title from '../components/typo/Title';
import Color from '../constants/Color';
import InputNumber from '../components/InputNumber';





export default function BookScreen({navigation}) {
  const dispatch = useDispatch();
  const selectedStorage = useSelector(sSelectedStorage);
  const loggedIn = useSelector(sLoggedIn);

  const datetime = useSelector(sCreateBookingDate);
  const date = new Date(datetime);
  const days = useSelector(sCreateBookingDays);
  const qty = useSelector(sCreateBookingQty);

 

  navigation.setOptions({
    title: selectedStorage?.name,
  });

  const handleAddBookingQty = function() {
   dispatch(addBookingQty());
  }

  const handleSubBookingQty = function() {
    dispatch(subBookingQty());
   }

  const handleAddBookingDays = function() {
    dispatch(addBookingDays());
  }
  const handleSubBookingDays = function() {
    dispatch(subBookingDays());
  }

  const onChangeDate = (event, selectedDate) => {
    setShow(false);
    const selectedDateTime = selectedDate.getTime();
    dispatch(setBookingDate(selectedDateTime));
  };

  const onCreateBooking = () => {
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
    <KeyboardAvoidingWrapper>
        <Page style={styles.container}>
          <Title text="Quando"></Title>      
          <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                onPressIn={showDatePicker}
                value={ moment(datetime).format("ddd D MMMM YYYY") }
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
                minimumDate={new Date()}
                onChange={onChangeDate}
              />
            )}

            <Title text="Quanti giorni"></Title>
            <View style={styles.inputView}>
              <InputNumber 
                handleAdd={handleAddBookingDays}
                handleSub={handleSubBookingDays} 
                number={days}
                />
          </View>


          <Title text="Quanti colli"></Title>
          <View style={styles.inputView}>
            <InputNumber 
                  handleAdd={handleAddBookingQty}
                  handleSub={handleSubBookingQty} 
                  number={qty}
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
              <Text style={styles.mainActionBtnText}>PRENOTA ORA</Text>
            </TouchableOpacity>}

          {!loggedIn &&<TouchableOpacity
              style={styles.mainActionBtn}
              onPress={onAccess}
            >
              <Text style={styles.mainActionBtnText}>Entra per prenotare</Text>
            </TouchableOpacity>}
          
        </Page>
      </KeyboardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  incDecrContainer: {
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row'
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
  mainActionBtnText: {
    color: Color.white,
    fontWeight: 600
  },
}); 