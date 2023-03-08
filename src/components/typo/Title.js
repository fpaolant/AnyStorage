import React from 'react';
import {StyleSheet, Text} from 'react-native';


function Title({text}) {
    return (<Text style={styles.text}>{text}</Text>);
}

export default Title;

const styles = StyleSheet.create({
    text: {
        fontSize: 22,
        fontWeight: '800',
        lineHeight: 26,
        color: '#554E8F',
        marginBottom: 10,
    },
});
