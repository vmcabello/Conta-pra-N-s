import React from "react";
import {
  Box,
  Text,
  HStack,
  Input,
  IconButton,
  Spacer,
  Pressable,
} from "native-base";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Line, Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Linking } from "react-native";

export default function Navbar() {
  const navigation = useNavigation();

  return (
    <HStack
      w={wp("100%")}
      h={hp("10%")}
      backgroundColor={"dark.50"}
      display="flex"
      flexDirection="row"
      padding="4"
      space={4}
    >
    
      <Box backgroundColor={"dark.400"} borderRadius="sm">
        <IconButton
          onPress={() =>
            Linking.openURL(
              "https://www.freeprivacypolicy.com/live/a0d63f8f-85fd-4104-b2e3-c2286843f932"
            )
          }
          icon={<MaterialIcons name="privacy-tip" size={28} color="black" />}
        />
      </Box>
      <Box backgroundColor={"dark.400"} borderRadius="sm">
        <IconButton
          onPress={() => navigation.navigate("Filters")}
          icon={<IconFilter />}
        />
      </Box>
    </HStack>
  );
}

const IconSearch = () => {
  return (
    <Svg width="24" height="24 " viewBox="0 0 17 17">
      <Path
        d="M11.76 10.27L17.49 16L16 17.49L10.27 11.76C9.2 12.53 7.91 13 6.5 13C2.91 13 0 10.09 0 6.5C0 2.91 2.91 0 6.5 0C10.09 0 13 2.91 13 6.5C13 7.91 12.53 9.2 11.76 10.27ZM6.5 2C4.01 2 2 4.01 2 6.5C2 8.99 4.01 11 6.5 11C8.99 11 11 8.99 11 6.5C11 4.01 8.99 2 6.5 2Z"
        fill="#CAC4D0"
      />
    </Svg>
  );
};

const IconCancel = () => {
  return (
    <Svg width="24" height="24" viewBox="0 0 20 20">
      <Path
        d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10 8.59L13.59 5L15 6.41L11.41 10L15 13.59L13.59 15L10 11.41L6.41 15L5 13.59L8.59 10L5 6.41L6.41 5L10 8.59Z"
        fill="#CAC4D0"
      />
    </Svg>
  );
};

const IconFilter = () => {
  return (
    <Svg width="32" height="27" viewBox="0 0 32 27" fill="none">
      <Line
        x1="1"
        y1="6.10928"
        x2="20.3278"
        y2="6.10928"
        stroke="#CAC4D0"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <Line
        x1="31"
        y1="20.584"
        x2="11.6722"
        y2="20.584"
        stroke="#CAC4D0"
        strokeWidth="2"
        strokeLinecap="square"
      />

      <Circle
        cx="26.2154"
        cy="5.77629"
        r="4.77629"
        stroke="#CAC4D0"
        strokeWidth="2"
      />
      <Circle
        cx="5.77651"
        cy="20.8194"
        r="4.77629"
        transform="rotate(180 5.77651 20.8194)"
        stroke="#CAC4D0"
        strokeWidth="2"
      />
    </Svg>
  );
};
