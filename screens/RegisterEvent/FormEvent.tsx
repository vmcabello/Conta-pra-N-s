import React from "react";
import LayoutWithoutNav from "../../components/LayoutWithoutNav";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  Pressable,
  ScrollView,
  Text,
  TextArea,
  useTheme,
} from "native-base";
import { IconClose, IconLocation } from "../../lib/icons";
import TimePicker from "../../components/common/TimePicker";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView } from "native-base";
import Svg, { Path } from "react-native-svg";
import LayoutRegister from "../../components/LayoutRegister";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function FormEvent({ navigation, route }: any) {
  const { params } = route;

  const methods = useForm({
    defaultValues: {
      date: new Date(),
      time: new Date(),
      address: "",
      latitude: 0,
      longitude: 0,
      description: "",
      category: params.category,
    },
  });

  const { colors } = useTheme();

  return (
    <LayoutRegister>
      <ScrollView
        showsVerticalScrollIndicator={false}
        mb={8}
        flex={1}
        keyboardShouldPersistTaps={"handled"}
      >
        <Text fontSize="3xl">Data</Text>
        <Text fontSize="2xl" mb={12}>
          Em que dia aconteceu?
        </Text>
        <HStack>
          <Controller
            name="date"
            control={methods.control}
            render={({ field: { onChange, value } }) => (
              <TimePicker
                name="Selecione"
                value={getParsedDate(value)}
                date={value}
                onChange={onChange}
                type="date"
              />
            )}
          />
        </HStack>

        <Text fontSize="3xl" mt={8}>
          Horário
        </Text>
        <Text fontSize="2xl" mb={12}>
          Aproximadamente que horas aconteceu?
        </Text>
        <Controller
          name="date"
          control={methods.control}
          render={({ field: { onChange, value } }) => (
            <TimePicker
              name="Selecione"
              value={`${value.getHours()}:${value.getMinutes()}`}
              date={value}
              onChange={onChange}
              type="time"
            />
          )}
        />

        <Text fontSize="3xl" mt={8}>
          Local de ocorrência
        </Text>
        <Text fontSize="2xl" mb={12}>
          Onde aconteceu?
        </Text>
        <HStack space={4}>
          <Box
            style={{
              borderBottomColor: colors.dark[700],
              borderBottomWidth: 1,
            }}
            px="4"
            py="3"
            backgroundColor="dark.600"
            flex={1}
          >
            <Controller
              control={methods.control}
              name="address"
              render={({ field: { onChange, value } }) => (
                <GooglePlacesAutocomplete
                  placeholder="Escreva aqui..."
                  fetchDetails={true}
                  onPress={(data, details = null) => {
                    console.log(JSON.stringify(details?.geometry.location));
                    methods.setValue(
                      "latitude",
                      details?.geometry.location.lat as any
                    );
                    methods.setValue(
                      "longitude",
                      details?.geometry.location.lng as any
                    );
                    onChange(data.description);
                  }}
                  query={{
                    key: "AIzaSyCfj5VU8ahGynXGmVHh5g7brky4RBzkGec",
                    language: "br",
                  }}
                />
              )}
            />
          </Box>
          <Pressable
            px={3}
            py={2}
            // onpress get current location and show an alert with the address

            style={{
              backgroundColor: colors.dark[400],
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconLocation size={40} />
          </Pressable>
        </HStack>

        <Text fontSize="3xl" mt={8}>
          Descrição (opcional)
        </Text>
        <Text fontSize="2xl" mb={12}>
          Pode nos contar mais detalhes? (Nada será exibido aos demais usuários)
        </Text>
        <Controller
          name="description"
          control={methods.control}
          render={({ field: { onChange, value } }) => (
            <Box
              style={{
                borderBottomColor: colors.dark[700],
                borderBottomWidth: 1,
                height: 200,
              }}
              p={4}
              backgroundColor="dark.600"
              mb={16}
            >
              <Text fontSize="sm" lineHeight={"xl"} color="dark.500">
                Descrição
              </Text>
              <TextArea
                placeholder="Escreva aqui..."
                onChangeText={onChange}
                value={value}
                borderTopLeftRadius={4}
                borderTopRightRadius={4}
                borderBottomLeftRadius={0}
                borderBottomRightRadius={0}
                borderWidth={0}
                autoCompleteType={undefined}
                flex={1}
                placeholderTextColor={colors.dark[500]}
                _focus={{
                  backgroundColor: "transparent",
                }}
              />
            </Box>
          )}
        />
        <Button
          onPress={() => {
            navigation.navigate("RegisterEvent", {
              screen: "Confirm",
              params: methods.getValues(),
            });
          }}
        >
          <Text>Próximo</Text>
        </Button>
      </ScrollView>
    </LayoutRegister>
  );
}

const getParsedDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

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
