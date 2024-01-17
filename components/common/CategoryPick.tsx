import { Box, Pressable, VStack,Text, useTheme } from 'native-base'
import React from 'react'
import { IconArrowRight, IconFurto } from '../../lib/icons'

export default function CategoryPick({onPress,label,description,icon:Icon}:any) {
  const { colors } = useTheme();

  return (
    <Pressable
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
          }} 
          mb={6}
          onPress={onPress}
        >
          <Box alignItems="center" flex={0.3} pt={1}>
            <Icon color={colors.primary[50]} size={25} />
          </Box>
          <VStack space={1} alignItems="flex-start" flex={1}>
            <Text fontSize="md" fontWeight="medium" color="dark.800">
              {label}
            </Text>
            <Text fontSize="xs" color="dark.500">
              {description}
            </Text>
          </VStack>
          <Box justifyContent="center" flex={0.3}>
            <IconArrowRight color={colors.primary[50]} size={25} />
          </Box>
        </Pressable>
  )
}
