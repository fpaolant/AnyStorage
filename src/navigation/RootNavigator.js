import React from "react";
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNavigationContainerRef } from '@react-navigation/native';
import HomeNavigator from "./HomeNavigator";
import BookingsNavigator from "./BookingsNavigator";

import SplashScreen from '../pages/SplashScreen';
import AccessScreen from '../pages/AccessScreen';
import { sAppIsFirstAccess } from "../selectors";


const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name={"HomeTab"} component={HomeNavigator} />
            <Tab.Screen name={"MyBookingsTab"} component={BookingsNavigator} />
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



export const serviceNavigator = createNavigationContainerRef();

export function navigate(route, params) {
  if (serviceNavigator.isReady()) {
    serviceNavigator.navigate(route, params);
  }
}

export function goBack() {
  if (serviceNavigator.isReady()) {
    serviceNavigator.goBack()
  }
}
