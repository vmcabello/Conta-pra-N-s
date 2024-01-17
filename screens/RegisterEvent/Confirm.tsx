import React from "react";
import { Pressable } from "react-native";
import LayoutWithoutNav from "../../components/LayoutWithoutNav";
import {
  IconArrowLeft,
  IconCar,
  IconClose,
  IconFurto,
  IconOther,
  IconSearchPerson,
  IconSteal,
} from "../../lib/icons";
import { Box, HStack, Text, VStack } from "native-base";
import { Route } from "react-router-native";
import LayoutRegister from "../../components/LayoutRegister";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../lib/firebaseConfig";

export default function Confirm({ navigation, route }: any) {
  const types = {
    steal: {
      label: "Roubo",
      icon: IconSteal,
    },
    furto: {
      label: "Furto",
      icon: IconFurto,
    },
    car: {
      label: "Acidente de trânsito",
      icon: IconCar,
    },
    disappearance: {
      label: "Desaparecimento",
      icon: IconSearchPerson,
    },
    other: {
      label: "Outro",
      icon: IconOther,
    },
  };

  const { label, icon: Icon } = types[route.params.category];

  const onSubmit = async () => {
    try {
      console.log("PARAMS: ", route.params);

      const docRef = await addDoc(collection(db, "events"), {
        ...route.params,
      });
      console.log("Document written with ID: ", docRef.id);

      navigation.navigate("SuccesRegister");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LayoutRegister>
      <Text fontSize="3xl">Confirmação</Text>
      <Text fontSize="2xl" mb={12}>
        Revise as informações para concluir o registro.
      </Text>
      <HStack space={6} alignItems="center" mt={8}>
        <Box
          flex={1}
          backgroundColor="primary.50"
          style={{
            width: 65,
            height: 65,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon size={42} color="black" />
        </Box>
        <VStack flex={4}>
          <Text fontSize="xl" fontWeight="medium">
            {label}
          </Text>
          <Text fontSize="md" fontWeight="medium">
            {`${route.params.time.getHours()}:${route.params.time.getMinutes()} `}
            • {getParsedDate(route.params.date)}
          </Text>
        </VStack>
      </HStack>
      <Text fontSize="sm" fontWeight="normal" mt="6">
        Local: {route.params.address}
      </Text>

      <Box>
        <Text fontSize="md" fontWeight="medium" mt="6">
          Descrição
        </Text>
        <Text fontSize="sm" fontWeight="normal" mt="2">
          {route.params.description}
        </Text>
      </Box>
      <Box
        style={{
          bottom: 0,
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
          marginTop: "auto",
          flexDirection: "row",
        }}
      >
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <IconArrowLeft size={16} />
        </Pressable>
        <Pressable onPress={() => onSubmit()}>
          <Text fontSize="xl" color="primary.50">
            Concluir registro
          </Text>
        </Pressable>
      </Box>
    </LayoutRegister>
  );
}

const getParsedDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
