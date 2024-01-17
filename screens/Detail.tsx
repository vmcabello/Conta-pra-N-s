import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Box, HStack, Pressable, ScrollView, Text, VStack } from "native-base";
import LayoutWithoutNav from "../components/LayoutWithoutNav";
import { IconSteal, IconArrowDown } from "../lib/icons";

export default function Detail({ navigation, route }: any) {
  const parseDate = (seconds: any, nanoseconds: any) => {
    var t = new Date(seconds * 1000 + nanoseconds / 1000000);
    return t;
  };

  function addZeroBefore(n: number) {
    return (n < 10 ? "0" : "") + n;
  }

  const getParsedDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };
  return (
    <LayoutWithoutNav>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
      >
        <IconArrowDown size={30} />
      </Pressable>
      <ScrollView showsVerticalScrollIndicator={false} mt={36} mb="10">
        <HStack space={6} alignItems="center">
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
            <IconSteal size={42} color="black" />
          </Box>
          <VStack flex={4}>
            <Text fontSize="xl" fontWeight="medium">
              {route.params.event.category}
            </Text>
            <Text fontSize="md" fontWeight="medium">
              {addZeroBefore(
                parseDate(
                  route.params.event.date.seconds,
                  route.params.event.date.nanoseconds
                ).getHours()
              ) +
                ":" +
                addZeroBefore(
                  parseDate(
                    route.params.event.date.seconds,
                    route.params.event.date.nanoseconds
                  ).getMinutes()
                ) +
                "  •  " +
                getParsedDate(
                  parseDate(
                    route.params.event.date.seconds,
                    route.params.event.date.nanoseconds
                  )
                )}
            </Text>
          </VStack>
        </HStack>
        <Text fontSize="sm" fontWeight="normal" mt="6">
          Local: {route.params.event.address}
        </Text>
   

        <Box>
          <Text fontSize="md" fontWeight="medium" mt="6">
            Descrição
          </Text>
          <Text fontSize="sm" fontWeight="normal" mt="2">
            {route.params.event.description}
          </Text>
        </Box>
        <Box>
          <Text fontSize="md" fontWeight="medium" mt="6">
            Resposta da Secretaria de Vivência
          </Text>
          <Text fontSize="sm" fontWeight="normal" mt="2">
            Olá. Lamentamos o ocorrido. Todos os anos, no regresso às aulas, há
            um aumento de assaltos, furtos e roubos em volta da Unicamp. Jovens
            alunos distraídos são as vítimas mais frequentes. Portanto, é
            importante olhar com atenção à sua volta. Não caminhe com o celular
            à vista, olhando mensagens. Caminhe nas ruas junto com amigos e
            colegas. Não deixe objetos visíveis nos veículos. Não se esqueça de
            iluminar a parte externa das habitações Acione o 190 e chame a
            Polícia Militar sempre que necessário. A Guarda Municipal (Base 3 em
            Barão Geraldo) também pode ajudar (telefone 151). Faça o registro de
            ocorrência no 7° Distrito Policial, na Avenida Professor Atílio
            Martini, 791, na Cidade Universitária. Não se exponha, mas não ceda
            ao pânico. A Secretaria de Vivência nos Campi (3521-6000), com apoio
            do Conselho de Segurança de Barão Geraldo, está buscando envolver as
            polícias locais na busca de soluções. Mas o mais importante é
            promover o apoio mútuo.
          </Text>
        </Box>
      </ScrollView>
    </LayoutWithoutNav>
  );
}
