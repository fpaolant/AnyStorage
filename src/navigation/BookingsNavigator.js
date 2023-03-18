import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyBookingsScreen from '../pages/MyBookingsScreen'


const BookingsStack = createNativeStackNavigator();

const screenOptions = {
    headerStyle: {
        backGroundColor: 'blue',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }
}

export default BookingsNavigator = () => {
    return (
        <BookingsStack.Navigator> 
            <BookingsStack.Group screenOptions={screenOptions}>
                <BookingsStack.Screen name={'MyBookings'} component={MyBookingsScreen} options={{title: ''}} />
            </BookingsStack.Group>
        </BookingsStack.Navigator>
    );
}
