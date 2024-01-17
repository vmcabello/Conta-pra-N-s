import React from "react";
import LayoutWithoutNav from "../../components/LayoutWithoutNav";
import { Box, Button, Center, Input, Text, useTheme } from "native-base";
import { IconApp } from "../../lib/icons";
import { Controller, useForm } from "react-hook-form";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../lib/firebaseConfig";
export default function Login() {
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { colors } = useTheme();

  const onSubmit = async (data: any) => {
    try {
	const email = data.email.trim();
      await createUserWithEmailAndPassword(auth, email, data.password)
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <LayoutWithoutNav>
      <Box w="4/6" mx="auto">
        <Center height="full">
          <IconApp />
          <Text fontSize="3xl" mt={8}>
            Cadastrar
          </Text>

          <Controller
            control={methods.control}
            name="email"
            rules={{
              required: "O e-mail é necessário",
              pattern: {
                // validate for email @dac.unicamp.br
                value: /@(dac\.)?unicamp\.br/,
                message: "Endereço de e-mail com domínio inválido",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Box
                style={{
                  borderBottomColor:
                    value == "" ? colors.dark[700] : colors.dark[900],
                  borderBottomWidth: value == "" ? 1 : 2,
                }}
                px="4"
                py="3"
                backgroundColor="dark.600"
                w="full"
                mt={8}
              >
                <Input
                  placeholder="Email"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  type="email"
                  size="xl"
                  color={"light.50"}
                  borderColor={"transparent"}
                  placeholderTextColor={colors.dark[500]}
                  _focus={{
                    borderColor: "transparent",
                    backgroundColor: "transparent",
                  }}
                />
              </Box>
            )}
          />
          {methods.formState.errors.email && (
            <Text
              style={{
                textAlign: "left",
                textTransform: "capitalize",
              }}
            >
              {" "}
              {methods.formState.errors.email.message}{" "}
            </Text>
          )}

          <Controller
            control={methods.control}
            name="password"
            rules={{
              required: "É necessária uma senha",
              minLength: {
                value: 6,
                message: "A senha deve ter pelo menos 6 caracteres",
              },
            }}
            render={({
              field: { onChange, value },
              fieldState: { isDirty },
            }) => (
              <Box
                style={{
                  borderBottomColor:
                    value == "" ? colors.dark[700] : colors.dark[900],
                  borderBottomWidth: value == "" ? 1 : 2,
                }}
                px="4"
                py="3"
                backgroundColor="dark.600"
                w="full"
                mt={8}
              >
                <Input
                  placeholder="Senha"
                  type="password"
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  size="xl"
                  color={"light.50"}
                  borderColor={"transparent"}
                  placeholderTextColor={colors.dark[500]}
                  _focus={{
                    borderColor: "transparent",
                    backgroundColor: "transparent",
                  }}
                />
              </Box>
            )}
          />
          {methods.formState.errors.password && (
            <Text
              style={{
                textAlign: "left",
                textTransform: "capitalize",
              }}
            >
              {" "}
              {methods.formState.errors.password.message}{" "}
            </Text>
          )}
          <Button
            mt={8}
            w="full"
            colorScheme="primary"
            onPress={methods.handleSubmit(onSubmit)}
          >
            Registrar
          </Button>
        </Center>
      </Box>
    </LayoutWithoutNav>
  );
}
