import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../pages/HomeScreen'
import SearchScreen from "../pages/SearchScreen";


const HomeStack = createNativeStackNavigator();

const screenOptions = {
    headerStyle: {
        backGroundColor: 'blue',
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }
}

export default HomeNavigator = () => {
    return (
        <HomeStack.Navigator> 
            <HomeStack.Group screenOptions={screenOptions}>
                <HomeStack.Screen name={'Home'} component={HomeScreen} />
            </HomeStack.Group>
            <HomeStack.Group screenOptions={{ presentation: 'modal' }}>
                <HomeStack.Screen name="SearchPlace" component={SearchScreen}/>
            </HomeStack.Group>
        </HomeStack.Navigator>
    );
}
