import React from "react";
import {
  Platform,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import moment from "moment";
import Color from "../constants/Color";

export default function BookingDetailModal({ booking, visible, setVisible }) {
  const onBringMeThere = function () {
    const lat = booking.storage.latitude;
    const lng = booking.storage.longitude;
    let url = Platform.select({
      ios: `maps://app?saddr=${lat}+${lng}&daddr=${lat}+${lng}`,
      android: `google.navigation:q=${lat}+${lng}`,
    });
    Linking.openURL(url);
    setVisible(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        statusBarTranslucent={true}
        animationType="slide"
        transparent={true}
        visible={visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>{booking.storage.name}</Text>

            <View style={styles.detailsContainer}>
              <Text style={styles.detailTitle}>Città</Text>
              <Text style={styles.detailText}>{booking.storage.city}</Text>

              <Text style={styles.detailTitle}>Check In</Text>
              <Text style={styles.detailText}>
                {moment(booking.datetime).format("dddd DD MMMM YYYY")}
              </Text>

              <Text style={styles.detailTitle}>Check Out</Text>
              <Text style={styles.detailText}>
                {moment(booking.datetime)
                  .add(booking.qty, "days")
                  .format("dddd DD MMMM YYYY")}
              </Text>

              <Text style={styles.detailTitle}>Pezzi</Text>
              <Text style={styles.detailText}>{booking.qty}</Text>

              <Text style={styles.detailTitle}>Pagato</Text>
              <Text style={styles.detailText}>{booking.amount} €</Text>
            </View>

            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: Color.white }]}
                onPress={() => {
                  setVisible(false);
                }}
              >
                <Text style={[styles.actionButtonText, { color: Color.blue }]}>
                  CHIUDI
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={onBringMeThere}
              >
                <Text style={styles.actionButtonText}>PORTAMI LI'</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "rgba(52, 52, 52, 0.6)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    height: 400,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 3,
    paddingVertical: 20,
    paddingHorizontal: 35,
    alignItems: "center",
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 26,
    color: "#554E8F",
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 5,
    marginBottom: 20,
  },
  detailText: {
    width: "100%",
    color: Color.lightGrey,
  },
  detailTitle: {
    width: "100%",
    color: Color.darkBlue,
    fontWeight: 700,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  actionButton: {
    width: "50%",
    borderWidth: 1,
    borderColor: Color.blue,
    alignItems: "center",
    paddingVertical: 15,
    color: Color.white,
    backgroundColor: Color.blue,
  },
  actionButtonText: {
    color: Color.white,
  },
});
