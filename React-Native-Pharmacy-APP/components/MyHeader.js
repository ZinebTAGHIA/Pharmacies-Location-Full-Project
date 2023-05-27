import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Badge, Surface, Text, Title } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../constants/Colors";

const IconSize = 24;

const AppHeader = ({
  style,
  back,
  onPressBack,
  headerBg = "white",
  iconColor = "black",
  titleAlight,
}) => {
  const LeftView = () => (
    <View style={styles.view}>
      {back && (
        <TouchableOpacity onPress={onPressBack}>
          <Feather name="arrow-left" size={IconSize} color={iconColor} />
        </TouchableOpacity>
      )}
      <Image source={require("../assets/logoPharm.png")} style={styles.image} />
    </View>
  );

  const TitleView = () => (
    <View style={styles.titleView}>
      <Title
        style={{
          color: iconColor,
          textAlign: titleAlight,
          fontFamily: "monospace",
          fontWeight: "bold",
        }}
      >
        PharmOuvert
      </Title>
    </View>
  );
  return (
    <Surface style={[styles.header, style, { backgroundColor: headerBg }]}>
      <LeftView />
      <TitleView />
    </Surface>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  header: {
    height: 80,
    elevation: 4,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 20,
  },
  view: {
    marginHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
  },
  titleView: {
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
  },
});
