import React from "react";
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Color from '../constants/Color'
import HomeNavigator from "./HomeNavigator";
import BookingsNavigator from "./BookingsNavigator";

import SplashScreen from '../pages/SplashScreen';
import AccessScreen from '../pages/AccessScreen';
import { sAppIsFirstAccess } from "../selectors";


const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const optionsTabNavigator = ({ route }) => ({
  headerShown: false,
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    switch (route.name) {
      case 'MyBookingsTab':
        iconName = focused
        ? 'calendar-range'
        : 'calendar-range-outline';
        break;
      case 'HomeTab':   
      default:
        iconName = focused
        ? 'store-search'
        : 'store-search-outline';
    }
    return (<MaterialCommunityIcons name={iconName} size={size} color={color}></MaterialCommunityIcons>);
  },
  tabBarActiveTintColor: Color.blue,
  tabBarInactiveTintColor: 'gray',
});

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={optionsTabNavigator}>
            <Tab.Screen name={"HomeTab"} component={HomeNavigator} screenOptions={{
              tabBarIcon: ({ focused, color, size}) => {

                return (<MaterialCommunityIcons name="store-search" size={size} color={color}></MaterialCommunityIcons>)
              }
            }}/>
            <Tab.Screen name={"MyBookingsTab"} component={BookingsNavigator} screenOptions={{ title: '' }} />
        </Tab.Navigator>
    );
}

export default function RootNavigator() {
    const isFirstAccess = useSelector(sAppIsFirstAccess);
    

    return (
        <RootStack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>
            {isFirstAccess && <RootStack.Screen name={'Splash'} component={SplashScreen} />}
            <RootStack.Screen name={'Tab'} component={TabNavigator}/>
            <RootStack.Group screenOptions={{ presentation: 'modal' }}>
                <RootStack.Screen name="Access" component={AccessScreen}/>
            </RootStack.Group>
            
        </RootStack.Navigator>
    );
}
