import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image, Button } from "react-native";
import Images from "../images";
import Color from "../constants/Color";

export default function ModalMapStorageContent({storage, onView, onBook}) {
        return (
            <>
            <Image source={Images.Logo} style={styles.storageLogo} resizeMode={"contain"} />
            <View style={{width: '70%'}}>
                <View style={styles.storageNameContainer}>
                  <Text style={styles.storageName}>{storage.name}</Text>
                  {storage.h24 && <Text style={styles.h24}>h24</Text>}
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.storagePrice}>{storage.price}€</Text>
                    <Text style={styles.storagePriceInfo}>/day per item</Text>
                    <View style={{flexDirection: 'row', marginVertical: 3}}>
                      <View style={styles.viewBtn}>
                        <TouchableOpacity onPress={onView}>
                          <Text style={styles.viewBtnText}>VEDI</Text>
                        </TouchableOpacity>
                        
                      </View>
                      <View style={styles.bookBtn}>
                        <TouchableOpacity onPress={onBook}>
                            <Text style={styles.bookBtnText}>PRENOTA</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                </View>

            </View>
          </>
        );
}


const styles = StyleSheet.create({
    storageLogo: {
      width: "20%",
      height: "auto",
      alignItems: 'center',
      marginHorizontal: 10,
      marginVertical: 10
    }, 
    storageNameContainer: {
      flex: 1,
      flexDirection: 'row',
      flexGrow: 0.3,
    }, 
    storageName: {
      fontSize: 16,
      fontWeight: 600,
      color: Color.blue
    },
    storagePrice: {
      marginTop: 5,
      fontSize: 18,
      fontWeight: 600,
      color: Color.white,
      backgroundColor: Color.blue,
      textAlign: "center"
    },
    storagePriceInfo: {
      marginTop: 2,
      fontSize: 14,
      fontWeight: 600,
      color: Color.white,
      backgroundColor: Color.blue,
      textAlign: "center"
    },
    h24: {
      color: Color.white,
      height: 14,
      fontSize: 10,
      borderColor: Color.red,
      backgroundColor: Color.red,
      fontWeight: 600,
      marginLeft: 5
    },
    bookBtn: {
      flex:1,
      justifyContent: 'center',
      height: 35, 
      alignItems:'center',
      borderColor: Color.blue,
      borderWidth: 1,
      color: Color.blue,
      marginLeft: 2
    },
    bookBtnText: {
      color: Color.blue,
      fontWeight: 700
    },
    viewBtn: {
      flex:1, 
      justifyContent: 'center',
      height: 35,
      alignItems:'center',
      borderColor: Color.blue,
      borderWidth: 1,
      color: Color.blue,
      marginRight: 2
    },
    viewBtnText: {
      color: Color.blue,
      fontWeight: 700
    }
    
  })

    
    