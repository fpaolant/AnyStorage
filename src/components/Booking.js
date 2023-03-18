import React, { useState } from "react";
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Color } from "../constants";
import BookingDetailModal from "./BookingModal";
import { useDispatch } from "react-redux";
import { deleteBooking } from "../actions";




export default function Booking({booking}) {
    const [modalVisible, setModalVisible] = useState(false);
    const handleNavigationToDetails = () => {
        setModalVisible(true);
    };

    const dispatch = useDispatch();
    const deleteBookingItem = () => {
        Alert.alert('Elimina prenotazione',
            'Confermi l\'eliminazione della prenotazione?', [
              {
                text: 'NO',
              },
              {
                text: 'SI', onPress: () => {
                    dispatch(deleteBooking(booking.id));
                },
              },
            ]);
        
    };
    const isSelected = false;

    const isExpired = function() {
        return moment(booking.datetime).isBefore();
    }

    const getReadableDate = function() {
        if(isExpired()) return moment(booking.datetime).format('DD MMMM');
        return moment(booking.datetime).startOf('day').fromNow();
    }

    
    
    return (
        <>
        <TouchableOpacity style={styles.container} onPress={handleNavigationToDetails}>
            <View style={styles.taskContainer}>
                <View style={[styles.type, {backgroundColor: (isExpired())? Color.red: Color.green}]}></View>
                <Text style={styles.date}>{getReadableDate()}</Text>
                <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingVertical: 10}}>
                    <Text style={styles.name}>{booking.storage.name}</Text>
                    <Text style={styles.city}>{booking.storage.city}</Text>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <Text style={styles.qty}>{booking.qty}<MaterialIcons name="luggage" size={14} color={Color.blue} /></Text>
                        <Text style={styles.qty}>{booking.qty}<MaterialIcons name="today" size={14} color={Color.blue} /></Text>
                        <Text style={styles.amount}>{booking.amount} €</Text>
                    </View>
                </View>
                
                
            </View>
            {isExpired() && <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.actionButton}
                                  onPress={deleteBookingItem} >
                    <Entypo name={'cross'} size={28} color={Color.lightGrey} />
                </TouchableOpacity>
            </View>}
        </TouchableOpacity>
        <BookingDetailModal booking={booking} visible={modalVisible} setVisible={setModalVisible} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'spaceBetween',
        backgroundColor: Color.white,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    taskContainer: {
        height: '100%',
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden',
    },
    actionContainer: {
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButton: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    type: {
        width: 4,
        backgroundColor: Color.black,
        height: '100%',
    },
    circleContainer: {
        marginLeft: 15,
        marginRight: 11,
    },
    circle: {
        width: 18,
        height: 18,
        borderWidth: 1,
        borderColor: Color.black,
        borderStyle: 'solid',
        borderRadius: 18,
    },
    circleFull: {
        backgroundColor: Color.black,
    },
    date: {
        fontSize: 13,
        fontWeight: 300,
        lineHeight: 13,
        color: Color.lightGrey,
        width: 90,
        paddingLeft: 5,
    },
    name: {
        fontSize: 16,
        fontWeight: 700,
        color: Color.darkBlue,
        flexGrow: 1
    },
    city: {
        fontSize: 14,
        color: Color.darkBlue,
        flexGrow: 1
    },
    qty: {
        fontSize: 14,
        lineHeight: 17,
        color: Color.blue,
        flexGrow: 1
    },
    amount: {
        fontSize: 14,
        lineHeight: 17,
        color: Color.green,
        flexGrow: 1
    },
});
