import React from "react";
import { StyleSheet, View } from "react-native";


export default function BottomModalMap({children, style}) {
        return (
                <View style={[
                    styles.container,
                    style
                ]}>
                    <View style={styles.storageInfoContainer}>
                        {children}
                    </View>
                </View>
        );
}


const styles = StyleSheet.create({
    storageContainer: {
        borderColor: 'blue',
        borderWidth: 2,
        height: 180,
        backgroundColor: 'transparent',
        paddingHorizontal: 10,
        paddingVertical: 8,
        width: '100%',
        alignIems: 'center'
    },
    storageInfoContainer: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%'
      },
      
})