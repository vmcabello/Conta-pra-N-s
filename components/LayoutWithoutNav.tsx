import React from "react";
import { Box, Text, View } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { KeyboardAvoidingView } from "native-base";
import { Platform } from "react-native";
export default function LayoutWithoutNav({ children }: any) {

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

  return (
    <SafeAreaView
      style={{ flex: 1, height: hp("100%"), backgroundColor: "#000000" }}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'height'} keyboardVerticalOffset={0}  enabled  >
        <Box
          style={{
            padding: 15,
            height:"100%"
          }}
        >
          {children}
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
