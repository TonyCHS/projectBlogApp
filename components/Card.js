import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

import AppLoading from "expo-app-loading";
import {
  useFonts,
  SnowburstOne_400Regular,
} from "@expo-google-fonts/snowburst-one";

import Text from "./Text";
import colors from "../config/colors";

function Card({ title, subTitle, image, onPress }) {
  let [fontsLoaded] = useFonts({
    SnowburstOne_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.card}>
          <Image style={styles.image} source={image} />
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.subTitle} numberOfLines={2}>
              {subTitle}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
    fontSize: 30,
    fontFamily: "SnowburstOne_400Regular",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: "SnowburstOne_400Regular",
  },
  title: {
    marginBottom: 7,
    fontSize: 30,
    fontFamily: "SnowburstOne_400Regular",
  },
});

export default Card;
