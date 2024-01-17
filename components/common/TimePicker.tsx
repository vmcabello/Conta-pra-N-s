import React, { useState } from "react";
import { Pressable, Box, Text, HStack } from "native-base";
import { IconCancel } from "../../lib/icons";
import { useTheme } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function TimePicker({
  name,
  value,
  onChange,
  date,
  type,
  minDate,
}: any) {
  const { colors } = useTheme();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    onChange(date);
  };

  return (
    <>
      <Pressable
        flex={1}
        onPress={() => {
          showDatePicker();
        }}
      >
        <Box
          backgroundColor="dark.600"
          px={4}
          pt="2"
          pb="3"
          style={{
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            borderBottomColor: colors.dark[700],
            borderBottomWidth: 1,
          }}
        >
          <HStack justifyContent="space-between" alignItems="center">
            <Box>
              <Text fontSize="sm" lineHeight={"xl"} color="dark.500">
                {name}
              </Text>
              <Text fontSize="md" lineHeight={"xl"} color="dark.500">
                {value}
              </Text>
            </Box>
            <IconCancel size={24} />
          </HStack>
        </Box>
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={type}
        date={date}
        locale="pt-BR"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={minDate}
      />
    </>
  );
}
