import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../pages/HomeScreen';
import { sAppIsFirstAccess } from "../selectors";
import { firstAccess } from "../actions";

const RootStack = createNativeStackNavigator();

export default function RootNavigator() {
    const isFirstAccess = useSelector(sAppIsFirstAccess);
    

    return (
        <RootStack.Navigator initialRouteName="Splash">
            {isFirstAccess && <RootStack.Screen name={'Splash'} component={SplashScreen} />}
            <RootStack.Screen name={'Home'} component={HomeScreen} />
        </RootStack.Navigator>
    );
}