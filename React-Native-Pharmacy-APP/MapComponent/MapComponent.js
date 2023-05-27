import React from "react";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function MapComponent({
  backHome,
  reset,
  map,
  zone,
  pharmacies,
}) {
  return (
    <View style={styles.container}>
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
      <MapView
        style={styles.map}
        clusterColor="#6364d5"
        initialRegion={{
          latitude: parseFloat(zone[0].Latitude),
          longitude: parseFloat(zone[0].Longitude),
          latitudeDelta: 0.2,
          longitudeDelta: 0.06,
        }}
      >
        {pharmacies.map((pharmacy) => (
          <Marker
            key={pharmacy._id}
            title={pharmacy.Title}
            pinColor="#6364d5"
            coordinate={{
              latitude: parseFloat(pharmacy.Latitude),
              longitude: parseFloat(pharmacy.Longitude),
            }}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  map: {
    width: "100%",
    height: "70%",
  },
});
