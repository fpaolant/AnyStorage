import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Color from "../constants/Color";
import { searchPlaceTextChange } from "../reducers/SearchPlaceReducer";
import { sHistorySearchPlaceText } from "../selectors";




const RapidCitySelection = function() {
    const dispatch = useDispatch();
    const navigation =  useNavigation();
    const places = useSelector(sHistorySearchPlaceText);


    const handleOnPress = function(place) {
        
        dispatch(searchPlaceTextChange(place));
        navigation.navigate('Map', {place});
    }

    return (
        <View style={styles.container}>
           {places.map((place, i) => {
                    return (
                        <TouchableOpacity style={styles.item} key={i} onPress={() => handleOnPress(place)}>
                            <Text style={styles.itemText} >{place}</Text>
                        </TouchableOpacity>
                    )
                })
           }
        </View>
    );

}

export default RapidCitySelection;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 30,
    },
    item: {
        width: '50%',
    },
    itemText: {
        textAlign: 'center',
        paddingVertical: 30,
        marginVertical: 5,
        marginHorizontal: 5,
        borderWidth: 3,
        borderColor: Color.lightBlue,
        borderRadius: 3,
        fontWeight: 700,
        color: Color.lightGrey,
        textTransform: 'uppercase',
    }
});