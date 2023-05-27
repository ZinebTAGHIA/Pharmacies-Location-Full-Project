import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const PharmaciesList = ({ pharmacies, onPress }) => {
  const renderPharmacie = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
        <View style={styles.container}>
          <Image
            source={{
              uri: !item.photo
                ? "https://www.1min30.com/wp-content/uploads/2018/05/R%C3%A9cipient-avec-un-serpent-logo.jpg"
                : item.photo,
            }}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.Title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={pharmacies}
      renderItem={renderPharmacie}
      keyExtractor={(item1) => item1._id.toString()}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 100,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    backgroundColor: "#FFF",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "5%",
    marginBottom: "5%",
    borderRadius: 20,
  },
  card: {
    flex: 1,
    height: "auto",
  },
  image: {
    width: "100%",
    height: 200,
  },
  textContainer: {
    padding: "2%",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PharmaciesList;
