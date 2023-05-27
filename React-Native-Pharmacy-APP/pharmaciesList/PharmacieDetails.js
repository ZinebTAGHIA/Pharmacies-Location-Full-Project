import React from "react";
import { View, Text, Image, Modal, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Linking } from "react-native";

const PharmacieDetails = ({ pharmacie, visible, onClose }) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${pharmacie.Latitude},${pharmacie.Longitude}`;
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 16,
            alignItems: "center",
            width: "50%",
            backgroundColor: "#F0F0F2",
            justifyContent: "center",
            borderRadius: 20,
          }}
        >
          <TouchableOpacity onPress={onClose} style={{ marginBottom: 16 }}>
            <AntDesign name="close" size={30} color="#6364d5" />
          </TouchableOpacity>
          <Image
            source={{
              uri: !pharmacie.photo
                ? "https://www.1min30.com/wp-content/uploads/2018/05/R%C3%A9cipient-avec-un-serpent-logo.jpg"
                : pharmacie.photo,
            }}
            style={{ width: "100%", height: 200, marginBottom: 16 }}
            resizeMode="contain"
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            {pharmacie.Title}
          </Text>
          <Text style={{ marginBottom: 8, textAlign: "center" }}>
            <Text style={{ fontWeight: "900" }}>Adresse:</Text>{" "}
            {pharmacie.Address}
          </Text>
          <Text style={{ marginBottom: 8, textAlign: "center" }}>
            <Text style={{ fontWeight: "900" }}>Tel:</Text>{" "}
            {pharmacie["Phone Number"]}
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL(url)}>
            <View style={{ flexDirection: "row" }}>
              <Image source={require("../assets/map-pin.png")} />
              <Text style={{ color: "#6364d5" }}>Ouvrir dans Google Maps</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PharmacieDetails;
