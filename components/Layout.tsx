import React from "react";
import { Box, Container, Flex, StatusBar } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "./Navbar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Platform } from "react-native";

export default function Layout({ children }: any) {
  return (
    <Box backgroundColor='dark.50'>
      <SafeAreaView
        style={{
          width: wp("100%"),
          height: Platform.OS === "ios" ? hp("89%") : "100%"
        }}
      >
        <StatusBar barStyle={'default'} />
        <Navbar />
        <Box w={wp("100%")} flex={1} backgroundColor={"red.900"}>
          {children}
        </Box>
      </SafeAreaView>
    </Box>
  );
}
