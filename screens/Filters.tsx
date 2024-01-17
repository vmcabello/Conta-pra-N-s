import { Box, HStack, Pressable, Text, Button } from "native-base";
import React, { useEffect, useContext } from "react";
import LayoutWithoutNav from "../components/LayoutWithoutNav";
import { IconClose } from "../lib/icons";
import TimePicker from "../components/common/TimePicker";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import AppContext from "../Context/AppContext";

export default function Filters() {
  const { SaveFilters, Filters } = useContext(AppContext);

  const methods = useForm({
    defaultValues: {
      time_start: Filters?.time_start || new Date(),
      time_end: Filters?.time_end || new Date(),
      date_start: Filters?.date_start || new Date(),
      date_end: Filters?.date_end || new Date(),
    },
  });

  useEffect(() => {
    if (methods.watch("time_end") < methods.watch("time_start")) {
      methods.setValue("time_end", methods.watch("time_start"));
      alert("O horário final não pode ser antes do horário inicial");
    }
  }, [methods.watch("time_end")]);

  /* useEffect(() => {
    SaveFilters(methods.getValues());
  }, [
    methods.watch("time_start"),
    methods.watch("time_end"),
    methods.watch("date_start"),
    methods.watch("date_end"),
  ]); */

  const navigation = useNavigation();

  return (
    <LayoutWithoutNav>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
      >
        <IconClose size={24} />
      </Pressable>
      <Box mt={8}>
        <Text fontSize="xl">Horário</Text>
        <Text fontSize="sm">
          Em que horário aconteceu as ocorrências que você tem interesse.
        </Text>

        <HStack mt={10} alignItems="center" space={2}>
          <Controller
            name="time_start"
            control={methods.control}
            render={({ field: { onChange, value } }) => (
              <TimePicker
                name="Início"
                value={`${addZeroBefore(value.getHours())}:${addZeroBefore(
                  value.getMinutes()
                )}`}
                date={value}
                onChange={onChange}
                type="time"
              />
            )}
          />
          <Text fontSize="xl">-</Text>
          <Controller
            name="time_end"
            control={methods.control}
            render={({ field: { onChange, value } }) => (
              <TimePicker
                name="Final"
                value={`${addZeroBefore(value.getHours())}:${addZeroBefore(
                  value.getMinutes()
                )}`}
                date={value}
                onChange={onChange}
                type="time"
                minDate={methods.watch("time_start")}
              />
            )}
          />
        </HStack>
      </Box>
      <Box mt={16}>
        <Text fontSize="xl">Datas</Text>
        <Text fontSize="sm">
          Em que dias aconteceram as ocorrências que você tem interesse.
        </Text>

        <HStack mt={10} alignItems="center" space={2}>
          <Controller
            name="date_start"
            control={methods.control}
            render={({ field: { onChange, value } }) => (
              <TimePicker
                name="Início"
                value={getParsedDate(value)}
                date={value}
                onChange={onChange}
                type="date"
              />
            )}
          />
          <Text fontSize="xl">-</Text>
          <Controller
            name="date_end"
            control={methods.control}
            render={({ field: { onChange, value } }) => (
              <TimePicker
                name="Final"
                value={getParsedDate(value)}
                date={value}
                onChange={onChange}
                type="date"
                minDate={methods.watch("date_start")}
              />
            )}
          />
        </HStack>
        <Button
          onPress={() => {
            SaveFilters(methods.getValues());
            navigation.goBack();
          }}
          style={{ marginTop: 50 }}
        >
          <Text>Salvar</Text>
        </Button>
      </Box>
    </LayoutWithoutNav>
  );
}

function addZeroBefore(n: number) {
  return (n < 10 ? "0" : "") + n;
}

const getParsedDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
