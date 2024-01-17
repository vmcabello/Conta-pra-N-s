import { Box, KeyboardAvoidingView, Pressable } from "native-base";
import React from "react";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { IconClose } from "../lib/icons";
import { useNavigation } from "@react-navigation/native";

export default function LayoutRegister({ children }: any) {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{ flex: 1, height: hp("100%"), backgroundColor: "#000000" }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
        keyboardVerticalOffset={0}
        enabled
      >
        <Box
          style={{
            padding: 15,
            height: "100%",
          }}
        >
          <Pressable
            onPress={() => {
              // reset navigation to screen Registrar in Tabs
              navigation.reset({
                index: 0,
                routes: [{ name: "Tabs", params: { screen: "Registrar" } }],
              });
            }}
          >
            <IconClose size={24} />
          </Pressable>
          <Box
            mt={8}
            style={{
              flex: 1,
            }}
          >
            {children}
          </Box>
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
