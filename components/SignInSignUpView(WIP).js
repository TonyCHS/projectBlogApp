import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../hooks/useAPI.js";
import { useDispatch } from "react-redux";
import { signInAction } from "../redux/ducks/blogAuth";

import Screen from "./Screen";
import * as Yup from "yup";
import { Form, FormField, SubmitButton } from "./forms";

import {
  useFonts,
  SnowburstOne_400Regular,
} from "@expo-google-fonts/snowburst-one";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().min(1).label("Username"),
  password: Yup.string().required().min(4).max(40).label("Password"),
});

export default function SignInSignUpView({ navigation, isSignIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [login, signup, loading, errorText] = useAuth(
    username,
    password,
    () => {
      dispatch(signInAction()); // function to be run on successful login
    }
  );

  let [fontsLoaded] = useFonts({
    SnowburstOne_400Regular,
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Screen style={styles.container}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />

        <Text style={styles.title}>
          {isSignIn ? "Sign In to Your Account" : "Sign up"}
        </Text>

        <Form
          initialValues={{ username: "", password: "" }}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >
          <FormField
            maxLength={100}
            autoCapitalize="none"
            autoCorrect={false}
            icon="human-greeting"
            name="username"
            value={username}
            placeholder="Username"
            onChangeText={(input) => setUsername(input)}
          />
          <FormField
            maxLength={50}
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            textContentType="password"
            onChangeText={(input) => setPassword(input)}
          />
          <SubmitButton
            onPress={isSignIn ? login : signup}
            title={isSignIn ? "Sign in" : "Sign up"}
          />

          {loading ? (
            <ActivityIndicator style={{ marginLeft: 20, marginBottom: 20 }} /> // adjust
          ) : null}
        </Form>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(isSignIn ? "SignUp" : "SignIn");
          }}
          style={styles.switchButton}
        >
          <Text style={styles.switchText}>
            {isSignIn
              ? "Don't have an account? Sign up here."
              : "Already have an account? Sign in here."}
          </Text>
        </TouchableOpacity>

        <Text style={styles.errorText}>{errorText}</Text>
        <View style={{ height: 20, alignItems: "left" }}></View>
      </Screen>
    </TouchableWithoutFeedback>
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    //   <View style={styles.container}>
    //     <Text style={styles.title}>
    //       {isSignIn ? "Sign In to Your Account" : "Sign up"}
    //     </Text>
    //     <Text style={styles.fieldTitle}>Username</Text>
    //     <TextInput
    //       style={styles.input}
    //       autoCapitalize="none"
    //       autoCorrect={false}
    //       value={username}
    //       onChangeText={(input) => setUsername(input)}
    //     />
    //     <Text style={styles.fieldTitle}>Password</Text>
    //     <TextInput
    //       style={styles.input}
    //       autoCapitalize="none"
    //       autoCompleteType="password"
    //       autoCorrect={false}
    //       secureTextEntry={true}
    //       value={password}
    //       onChangeText={(input) => setPassword(input)}
    //     />
    //     <View style={{ flexDirection: "row" }}>
    // <TouchableOpacity
    //   onPress={isSignIn ? login : signup}
    //   style={styles.loginButton}
    // >
    //         <Text style={styles.buttonText}>
    //           {isSignIn ? "Sign in" : "Sign up"}
    //         </Text>
    //       </TouchableOpacity>
    //       {loading ? (
    //         <ActivityIndicator style={{ marginLeft: 20, marginBottom: 20 }} /> // adjust
    //       ) : null}
    //     </View>
    // <TouchableOpacity
    //   onPress={() => {
    //     navigation.navigate(isSignIn ? "SignUp" : "SignIn");
    //   }}
    //   style={styles.switchButton}
    // >
    //   <Text style={styles.switchText}>
    //     {isSignIn
    //       ? "Don't have an account? Sign up here."
    //       : "Already have an account? Sign in here."}
    //   </Text>
    // </TouchableOpacity>

    //     <Text style={styles.errorText}>{errorText}</Text>
    //     <View style={{ height: 20, alignItems: "left" }}></View>
    //   </View>
    // </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 24,
  },
  fieldTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    borderColor: "#999",
    borderWidth: 1,
    marginBottom: 24,
    padding: 4,
    height: 36,
    fontSize: 18,
    backgroundColor: "white",
  },
  loginButton: {
    backgroundColor: "blue",
    width: 120,
    alignItems: "center",
    padding: 18,
    marginTop: 12,
    marginBottom: 36,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  switchText: {
    color: "blue",
  },
  errorText: {
    color: "red",
    height: 40,
  },
  logo: {
    width: 500,
    height: 280,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});
