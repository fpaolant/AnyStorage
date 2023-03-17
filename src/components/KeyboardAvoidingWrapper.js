import React, { Children } from "react";
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, View, Keyboard } from "react-native";
import Color from "../constants/Color";


const KeyboardAvoidingWrapper = ({children}) => {
    return (
        <KeyboardAvoidingView style={{flex: 1, backgroundColor: Color.white}}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default KeyboardAvoidingWrapper;