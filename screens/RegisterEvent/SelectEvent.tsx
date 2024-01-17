import React from "react";
import LayoutWithoutNav from "../../components/LayoutWithoutNav";
import { Box, Pressable, Text, useTheme, VStack } from "native-base";
import {
  IconArrowRight,
  IconClose,
  IconFurto,
  IconStrokeCircle,
  IconSteal,
  IconCar,
  IconSearchPerson,
  IconOther,
} from "../../lib/icons";
import CategoryPick from "../../components/common/CategoryPick";
import LayoutRegister from "../../components/LayoutRegister";
export default function SelectEvent({ navigation }: any) {
  return (
    <LayoutRegister>
      <Text fontSize="3xl" >
        Tipo de ocorrência
      </Text>
      <Text fontSize="2xl" mb={12}>
        O que aconteceu?
      </Text>

      <Box>
        <CategoryPick
          onPress={() => {
            navigation.navigate("FormEvent", {
              category: "steal",
            });
          }}
          label="Roubo"
          description="Subtração de objeto mediante ameaça ou violência à pessoa que não resulte em morte ou lesão corporal."
          icon={IconSteal}
        />

        <CategoryPick
          onPress={() => {
            navigation.navigate("FormEvent", { category: "furto" });
          }}
          label="Furto"
          description="Subtração de objeto sem violência ou ameaça à pessoa."
          icon={IconFurto}
        />

        <CategoryPick
          onPress={() => {
            navigation.navigate("FormEvent", { category: "car" });
          }}
          label="Acidente de trânsito"
          description="Acidente envolvendo veículo automotor."
          icon={IconCar}
        />
        <CategoryPick
          onPress={() => {
            navigation.navigate("FormEvent", { category: "disappearance" });
          }}
          label="Desaparecimento"
          description="Sumiço de pessoa por razões desconhecidas."
          icon={IconSearchPerson}
        />
        <CategoryPick
          onPress={() => {
            navigation.navigate("FormEvent", { category: "other" });
          }}
          label="Outro"
          description="Outras ocorrências de relevância jurídica."
          icon={IconOther}
        />
      </Box>
    </LayoutRegister>
  );
}
