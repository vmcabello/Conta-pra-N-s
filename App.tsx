import React from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  StatusBar,
} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { theme } from "./lib/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Register from "./screens/Register";
import Detail from "./screens/Detail";
import Filters from "./screens/Filters";
import SelectEvent from "./screens/RegisterEvent/SelectEvent";
import FormEvent from "./screens/RegisterEvent/FormEvent";
import Confirm from "./screens/RegisterEvent/Confirm";
import SuccesRegister from "./screens/RegisterEvent/SuccesRegister";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyTabBar from "./components/TabBar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Saves from "./screens/Saves";
import Login from "./screens/Auth/Login";
import RegisterAuth from "./screens/Auth/Register";

import { auth } from "./lib/firebaseConfig";
import { useAuthentication } from "./lib/useAuth";
import "./lib/firebaseConfig";
import AppState from "./Context/AppState";
type MyThemeType = typeof theme;

declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}

const Stack = createNativeStackNavigator();

export default function App() {
  const { user } = useAuthentication();

  console.log("ROOT");

  return (
    <NativeBaseProvider theme={theme}>
      <AppState>
        <NavigationContainer>
          <Stack.Navigator>
            {user ? (
              <>
                <Stack.Screen
                  name="Tabs"
                  component={Tabs}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Detail"
                  component={Detail}
                  options={{ headerShown: false, gestureDirection: "vertical" }}
                />
                <Stack.Screen
                  name="Filters"
                  component={Filters}
                  options={{ headerShown: false, gestureDirection: "vertical" }}
                />
                <Stack.Screen
                  name="RegisterEvent"
                  component={RegisterEvent}
                  options={{
                    headerShown: false,
                    gestureDirection: "horizontal",
                  }}
                />
              </>
            ) : (
              <Stack.Screen
                name="Auth"
                component={AuthStack}
                options={{ headerShown: false, gestureDirection: "horizontal" }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AppState>
    </NativeBaseProvider>
  );
}

const Tabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen name="Explorar" component={Home} />
      <Tab.Screen name="Registrar" component={Register} />
      <Tab.Screen name="Salvos" component={Saves} />
    </Tab.Navigator>
  );
};

const RegisterEvent = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SelectEvent"
        component={SelectEvent}
        options={{ headerShown: false, gestureDirection: "horizontal" }}
      />
      <Stack.Screen
        name="FormEvent"
        component={FormEvent}
        options={{ headerShown: false, gestureDirection: "horizontal" }}
      />
      <Stack.Screen
        name="Confirm"
        component={Confirm}
        options={{ headerShown: false, gestureDirection: "horizontal" }}
      />
      <Stack.Screen
        name="SuccesRegister"
        component={SuccesRegister}
        options={{ headerShown: false, gestureDirection: "horizontal" }}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false, gestureDirection: "horizontal" }}
      />
       <Stack.Screen
        name="Register"
        component={RegisterAuth}
        options={{ headerShown: false, gestureDirection: "horizontal" }}
      />
    </Stack.Navigator>
  );
};
