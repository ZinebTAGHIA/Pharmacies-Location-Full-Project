import React from "react";
import { View, Image } from "react-native-animatable";

const LoadingPage = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image source={require("../assets/logoPharm.png")} />
    </View>
  );
};

export default LoadingPage;
