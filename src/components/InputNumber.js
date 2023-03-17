import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Entypo } from '@expo/vector-icons';


const InputNumber = ({handleAdd, handleSub, number}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSub}
      >
        <Entypo name="minus" size={24} color="white" />
      </TouchableOpacity>

        <Text style={styles.numberValue}>{number}</Text>
      
        <TouchableOpacity
            style={styles.button}
            onPress={handleAdd}
        >
        <Entypo name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 40
    },
    numberValue: {
        lineHeight: 30,
        flexGrow: 2,
        textAlign: 'center',
    },
    button: {
        flexGrow: 1,
        backgroundColor: '#ccc',
        alignItems: 'center',
        paddingVertical: 10
    }
});

export default InputNumber;
