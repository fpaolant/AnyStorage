import React, {} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";

import HomeScreen from '../pages/HomeScreen';
import SplashScreen from '../pages/SplashScreen';
import SearchScreen from '../pages/SearchScreen';
import MyBookingsScreen from "../pages/MyBookingsScreen";
import { sAppIsFirstAccess } from "../selectors";
import { firstAccess } from "../actions";


const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name={"HomeTab"} component={HomeNavigator} />
            <Tab.Screen name={"MyBookingsTab"} component={MyBookingsScreen} />
        </Tab.Navigator>
    );
}

export default function RootNavigator() {
    const isFirstAccess = useSelector(sAppIsFirstAccess);
    

    return (
        <RootStack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>
            {isFirstAccess && <RootStack.Screen name={'Splash'} component={SplashScreen} />}
            <RootStack.Screen name={'Tab'} component={TabNavigator}/>
            
        </RootStack.Navigator>
    );
}