import React from "react";
import { Pressable } from "react-native";
import { Box, Center, Text, useTheme } from "native-base";
import { color } from "native-base/lib/typescript/theme/styled-system";

export default function ButtonLabel({
  icon: Icon,
  label,
  isFocused,
  onPress,
  key,
}: any) {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      style={{
        paddingRight: 15,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Center>
        <Box
          backgroundColor={isFocused ? "dark.200" : "dark.50"}
          paddingX={5}
          paddingY={2}
          borderRadius={100}
          justifyContent="center"
          alignItems="center"
        >
          <Icon color={isFocused ? colors.primary[50] : colors.dark[500]} size={24} />
        </Box>
        <Text
          textAlign="center"
          paddingTop="2"
          color={isFocused ? colors.primary[50] : colors.dark[500]}
          fontWeight="medium"
          fontSize='xs'
        >
          {label}
        </Text>
      </Center>
    </Pressable>
  );
}
