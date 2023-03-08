import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default function ButtonText({text, white}) {
    return (
        <Text
            style={[styles.text, white ? styles.white : {}]}
        >{text}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22,
        color: '#554E8F',
        textAlign: 'center'
    },
    white: {
        color: 'white',
    },
});
