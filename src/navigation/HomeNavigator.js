import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../pages/HomeScreen'
import MapScreen from '../pages/MapScreen'
import SearchScreen from "../pages/SearchScreen";
import BookScreen from "../pages/BookScreen";
import Color from "../constants/Color";


const HomeStack = createNativeStackNavigator();

const screenOptions = {
    headerStyle: {
        backGroundColor: Color.blue,
        headerTintColor: Color.white,
        headerTitleStyle: {
            fontWeight: 'bold'
        }
    }
}

export default HomeNavigator = () => {
    return (
        <HomeStack.Navigator> 
            <HomeStack.Group screenOptions={screenOptions}>
                <HomeStack.Screen name={'Home'} component={HomeScreen} screenOptions={{title:''}}/>
                <HomeStack.Screen name={'Map'} component={MapScreen} />
                <HomeStack.Screen name={'Book'} component={BookScreen} />
            </HomeStack.Group>
            <HomeStack.Group screenOptions={{ presentation: 'modal' }}>
                <HomeStack.Screen name="SearchPlace" component={SearchScreen} 
                options={{ headerShown: false }}/>
            </HomeStack.Group>
        </HomeStack.Navigator>
    );
}
