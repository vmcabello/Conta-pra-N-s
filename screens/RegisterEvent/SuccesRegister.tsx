import React from "react";
import LayoutRegister from "../../components/LayoutRegister";
import { Box, Pressable, Text } from "native-base";

export default function SuccesRegister({ navigation }: any) {
  return (
    <LayoutRegister>
      <Box width='xs'>
        <Text fontSize="3xl">Seu registro foi concluído</Text>
        <Text fontSize="2xl" mt='2'>
          Seu relato está disponível parara informar outras pessoas.
        </Text>
      </Box>
      <Pressable
        onPress={() => navigation.reset({ index: 0, routes: [{ name: "Tabs", params: { screen: "Registrar" }}] })}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      >
        <Text fontSize="xl" color="primary.50">
          Ver registro
        </Text>
      </Pressable>
    </LayoutRegister>
  );
}
