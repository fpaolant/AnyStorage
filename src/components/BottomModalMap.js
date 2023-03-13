import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

import Color from "../constants/Color";

export default function BottomModalMap({children, style, onClose=()=>{}}) {
        return (
                <View style={[
                    styles.container,
                    style
                ]}>
                    <TouchableOpacity
                            style={styles.closeBtn}
                            onPress={onClose}
                        >
                            <Ionicons name="close" size={24} color={Color.lightGrey} />
                        </TouchableOpacity>
                    <View style={styles.infoContainer}>
                            {children}
                    </View>
                </View>
        );
}


const styles = StyleSheet.create({
    container: {
        position: "fixed",
        bottom: "26%",
        height: "23%",
        backgroundColor: 'transparent',
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '100%',
        alignIems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.46,
        shadowRadius: 11.14,
        elevation: 17, 
    },
    infoContainer: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    closeBtn: {
        backgroundColor: 'white',
        alignIems: 'right'
    }
      
})

    
    