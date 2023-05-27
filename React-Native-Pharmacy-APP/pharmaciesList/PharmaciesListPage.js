import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import PharmaciesList from "./PharmaciesList";
import PharmacieDetails from "./PharmacieDetails";
import { TouchableOpacity } from "react-native-gesture-handler";

const PharmaciesListPage = ({ pharmacies, backHome, reset, map }) => {
  const [selectedPharmacy, setSelectedPharmacie] = useState(null);
  const handlePharmacyPress = (pokemon) => {
    setSelectedPharmacie(pokemon);
  };

  const handleDetailsClose = () => {
    setSelectedPharmacie(null);
  };

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: "#F0F0F2",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "#6364d5",
          padding: 20,
          borderRadius: 15,
          alignItems: "center",
          marginTop: 10,
          marginBottom: 50,
        }}
        onPress={() => {
          backHome(true);
          reset(false);
          map(false);
        }}
      >
        <Text
          style={{
            color: "#fff",
            textTransform: "uppercase",
            fontWeight: "600",
          }}
        >
          Reset
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "#6364d5",
          padding: 20,
          borderRadius: 15,
          alignItems: "center",
          marginTop: 10,
          marginBottom: 50,
        }}
        onPress={() => {
          map(true);
          reset(false);
        }}
      >
        <Text
          style={{
            color: "#fff",
            textTransform: "uppercase",
            fontWeight: "600",
          }}
        >
          Localisation
        </Text>
      </TouchableOpacity>
      <PharmaciesList pharmacies={pharmacies} onPress={handlePharmacyPress} />
      {selectedPharmacy && (
        <PharmacieDetails
          pharmacie={selectedPharmacy}
          visible={true}
          onClose={handleDetailsClose}
        />
      )}
    </View>
  );
};

export default PharmaciesListPage;
