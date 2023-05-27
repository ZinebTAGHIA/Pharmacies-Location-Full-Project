import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import PharmaciesListPage from "../pharmaciesList/PharmaciesListPage";
import MapComponent from "../MapComponent/MapComponent";

const Home = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [cities, setCities] = useState([]);
  const [zones, setZones] = useState([]);
  const [citiesOptions, setCitiesOptions] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [selectVille, setSelectVille] = useState(null);
  const [selectZone, setSelectZone] = useState(null);
  const [selectGarde, setSelectGarde] = useState(null);
  const [filteredPharmacies, setFilteredPharmacies] = useState(null);
  const [showDropdown, setShowDropdown] = useState(true);
  const [showPharmList, setShowPharmList] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    axios
      .get("https://ill-baseball-cap-calf.cyclic.app/api/cities")
      .then((response) => {
        setCities(response.data);
        let citiesConverted = response.data.map((city) => {
          return { label: city.Name, value: city._id };
        });
        setCitiesOptions(citiesConverted);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://ill-baseball-cap-calf.cyclic.app/api/zones")
      .then((response) => {
        setZones(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://ill-baseball-cap-calf.cyclic.app/api/pharmacies")
      .then((response) => {
        setPharmacies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const gardes = [
    { label: "Jour", value: "jour" },
    { label: "Nuit", value: "nuit" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {showDropdown && (
        <View
          style={{ backgroundColor: "#fff", padding: 20, borderRadius: 15 }}
        >
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={citiesOptions}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Sélectionner une ville" : "..."}
            searchPlaceholder="Search..."
            value={selectVille}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setSelectVille(item);
              setSelectZone(null);
              setSelectGarde(null);
              setIsFocus(false);
            }}
          />
          {selectVille && (
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={zones
                .filter((zone) => zone.City_id === selectVille.value)
                .map((filteredZone) => {
                  return { label: filteredZone.Name, value: filteredZone._id };
                })}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Sélectionner une zone" : "..."}
              searchPlaceholder="Search..."
              value={selectZone}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setSelectZone(item);
                setSelectGarde(null);
                setIsFocus(false);
              }}
            />
          )}
          {selectVille && selectZone && (
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={gardes}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Sélectionner le type de garde" : "..."}
              searchPlaceholder="Search..."
              value={selectGarde}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setSelectGarde(item.value);
                setIsFocus(false);
                let pharmaciesFilter = pharmacies.filter(
                  (pharmacie) =>
                    pharmacie.Zone_id === selectZone.value &&
                    pharmacie.Garde === item.value
                );
                setFilteredPharmacies(pharmaciesFilter);
              }}
            />
          )}
          <TouchableOpacity
            style={{
              backgroundColor: "#6364d5",
              padding: 20,
              borderRadius: 15,
              alignItems: "center",
            }}
            onPress={() => {
              if (!selectVille || !selectZone || !selectGarde) {
                Alert.alert("Vous devez remplir tous les champs !");
              } else {
                setShowDropdown(false);
                setShowPharmList(true);
              }
            }}
          >
            <Text
              style={{
                color: "#fff",
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              Chercher
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {showPharmList && (
        <PharmaciesListPage
          backHome={setShowDropdown}
          reset={setShowPharmList}
          pharmacies={filteredPharmacies}
          map={setShowMap}
        />
      )}
      {showMap && (
        <MapComponent
          backHome={setShowDropdown}
          reset={setShowPharmList}
          map={setShowMap}
          zone={zones.filter((zone) => zone._id === selectZone.value)}
          pharmacies={filteredPharmacies}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
    padding: 16,
    width: "80%",
    justifyContent: "center",
    alignContent: "center",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
