import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Switch,
  Text,
  View,
  FlatList,
} from "react-native";
import { commonStyles } from "../styles/commonStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUsername } from "../hooks/useAPI";
import { useDispatch, useSelector } from "react-redux";
import { signOutAction } from "../redux/ducks/blogAuth";
import { toggleDarkMode } from "../redux/ducks/accountPrefs";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";
import { ListItem, ListItemSeparator } from "../components/lists";

const menuItems = [
  {
    title: "Settings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
    // targetScreen: routes.SETTINGS,
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    // targetScreen: routes.MESSAGES,
  },
];

export default function AccountScreen({ navigation }) {
  const [username, loading, error, refresh] = useUsername();
  const isDarkModeOn = useSelector((state) => state.prefs.darkMode);
  const dispatch = useDispatch();

  // signs out if the useUsername hook returns error as true
  useEffect(() => {
    console.log("Signing out");
    if (error) {
      signOut();
    }
  }, [error]);

  useEffect(() => {
    const removeListener = navigation.addListener("focus", () => {
      refresh(true);
    });
    return removeListener;
  }, []);

  function signOut() {
    AsyncStorage.removeItem("token");
    dispatch(signOutAction());
  }

  return (
    <Screen style={styles.screen}>
      <View
        style={[
          // commonStyles.container,
          styles.container,
          isDarkModeOn && { backgroundColor: "black" },
        ]}
      >
        <Text
          style={[styles.titleText, isDarkModeOn && { color: "white" }]}
        ></Text>

        <View style={styles.container}>
          <ListItem
            title={
              loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.usernameText}>{username}</Text>
              )
            }
            image={require("../assets/profile.png")}
          />
        </View>
        <View style={styles.container}>
          <FlatList
            data={menuItems}
            keyExtractor={(menuItem) => menuItem.title}
            ItemSeparatorComponent={ListItemSeparator}
            renderItem={({ item }) => (
              <ListItem
                title={item.title}
                IconComponent={
                  <Icon
                    name={item.icon.name}
                    backgroundColor={item.icon.backgroundColor}
                  />
                }
              />
            )}
          />
        </View>

        <ListItem
          style={styles.usernameText}
          title="Sign out"
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
          onPress={signOut}
        />
        {/* <Button title="Sign out" onPress={signOut} /> */}
      </View>

      <View
        style={[
          styles.horizontalBlock,
          // commonStyles.container,
          isDarkModeOn && { backgroundColor: "black" },
        ]}
      >
        <Text style={isDarkModeOn && { color: "white" }}>Dark mode </Text>
        <Switch
          value={isDarkModeOn}
          onValueChange={() => dispatch(toggleDarkMode())}
        />
        <Text style={isDarkModeOn && { color: "white" }}>
          {" "}
          {isDarkModeOn ? " On" : " Off"}
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  usernameText: {
    fontSize: 18,
    color: "grey",
    marginBottom: 12,
  },
  horizontalBlock: {
    alignItems: "center",
    justifyContent: "center",
    // justifyContent: "space-between",
    // width: "40%",
    flexDirection: "row",
    padding: 30,
    marginTop: 50,
  },
});
