import React from "react";
import { ImageBackground } from "react-native";
import { Box, IPressableProps, Pressable, Text } from "native-base";
import { Game } from "../screens/home/Home";

interface Props extends IPressableProps {
  data: Game;
}
export const GameCard = ({ data, ...rest }: Props) => {
  return (
    <Pressable
      _pressed={{
        opacity: 0.5,
      }}
      {...rest}
    >
      <ImageBackground
        style={{
          width: 240,
          height: 320,
          justifyContent: "flex-end",
          borderRadius: 8,
          overflow: "hidden",
        }}
        source={{ uri: data.bannerUrl }}
      >
        <Box
          bg={{
            linearGradient: {
              colors: ["footer.100", "footer.200"],
            },
          }}
          w="full"
          p="4"
          justifyContent="flex-end"
        >
          <Text fontSize="lg" color="text" fontWeight="bold">
            {data.title}
          </Text>
          <Text fontSize="lg" color="caption.300" fontWeight="regular">
            {data._count.ads} anúncio(s)
          </Text>
        </Box>
      </ImageBackground>
    </Pressable>
  );
};
