import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default function Subtitle({text}) {
    return <Text style={styles.text}>{text}</Text>;
}

const styles = StyleSheet.create({
    text: {
        fontSize: 17,
        fontWeight: '400',
        lineHeight: 24,
        color: '#82A0B7',
        marginBottom: 22,
    },
});
