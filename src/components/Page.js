import React from "react";
import { StyleSheet, View } from "react-native";


export default function Page({children, style}) {
        return (
                <View style={[
                    styles.container,
                    style
                ]}>
                    {children}
                </View>
        );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    }
})