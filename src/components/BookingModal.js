import React, {useCallback, useState} from 'react';
import {Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export default function BookingDetailModal({booking, visible, setVisible}) {

  

  return (
      <View style={styles.centeredView}>
        <Modal
            statusBarTranslucent={true}
            animationType="slide"
            transparent={true}
            visible={visible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.title}>{booking.storageName}</Text>
                
                

                <TouchableOpacity style={styles.actionButton}
                                  onPress={ () => { setVisible(false)} } >
                    <Text>Chiudi</Text>
                </TouchableOpacity>

              {/* <MyButton text={'PRENOTA AL RISTORNATE'}
                        color={'#0089FF'}
                        pressedColor={'#00539C'}
                        styleButton={styles.button}
                        onPress={() => {
                          setModalVisible(!modalVisible);

                        }}
                        disabled={
                          checkDate()
                        }/> */}
            </View>
          </View>
        </Modal>
      </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: 300,
    height: 380,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal: 35,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 26,
    color: '#554E8F',
    marginBottom: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  labelContainer: {
    paddingHorizontal: 12,
    marginBottom: 5,
  },
  text: {
    fontSize: 15,
    fontWeight: '400',
    marginTop: 14,
  },
  rowData: {
    marginStart: 48,
  },
  rowOra: {
    marginStart: 68,
  },
  rowPosti: {
    marginStart: 85,
  },
});

