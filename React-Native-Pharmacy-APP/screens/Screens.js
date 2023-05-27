import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import Styles from "../common/Styles";
import Colors from "../constants/Colors";
import Home from "../Home/Home";
import MyHeader from "../components/MyHeader";

export default function Screens({ route, navigation }) {
  const viewRef = React.useRef(null);
  const [bgColor, setBgColor] = useState();

  useEffect(() => {
    switch (route.name) {
      case "Home":
        setBgColor(Colors.purple);
        break;
      case "About":
        setBgColor(Colors.purple);
        break;
      case "Contact":
        setBgColor(Colors.purple);
        break;
      default:
        setBgColor(Colors.white);
    }
  }, [route.name]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      viewRef.current.animate({ 0: { opacity: 0.5 }, 1: { opacity: 1 } });
    });
    return () => unsubscribe();
  }, [navigation]);

  const getPageContent = () => {
    switch (route.name) {
      case "Home":
        return <Home />;
      case "About":
        return (
          <Text style={[styles.pageText, { color: Colors.white }]}>
            This is the About page
          </Text>
        );
      case "Contact":
        return (
          <View style={styles.pageContent}>
            <Text style={styles.heading}>Réseaux sociaux</Text>
            <View style={styles.socialMediaContainer}>
              <Image
                source={require("../assets/fbimg.png")}
                style={[styles.image, styles.smallImage]}
              />
              <Image
                source={require("../assets/instaimg.png")}
                style={[styles.image, styles.smallImage]}
              />
              <Image
                source={require("../assets/linkedinimg.png")}
                style={[styles.image, styles.smallImage]}
              />
              <Image
                source={require("../assets/twitterimg.png")}
                style={[styles.image, styles.smallImage]}
              />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={Styles.container}>
      <MyHeader
        menu
        onPressMenu={() => navigation.goBack()}
        title={route.name}
        right="more-vertical"
        onRightPress={() => console.log("right")}
      />
      <Animatable.View
        ref={viewRef}
        easing="ease-in-out"
        style={Styles.container}
      >
        <View
          style={{
            backgroundColor: bgColor,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {getPageContent()}
        </View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  socialMediaContainer: {
    flexDirection: "row", // Arrange images in a row
    justifyContent: "center", // Center the images horizontally
    alignItems: "center", // Center the images vertically
    marginTop: 10, // Adjust this margin as needed
  },
  image: {
    // Your existing styles for image
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    resizeMode: "contain", // Maintain aspect ratio and fit within the container
    marginHorizontal: 10, // Adjust this margin as needed
  },
  smallImage: {
    width: 50, // Adjust the width as needed
    height: 50, // Adjust the height as needed
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.white,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
  },
  dropdown: {
    width: 200,
    marginTop: 10,
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownMenu: {
    width: 200,
  },
});
