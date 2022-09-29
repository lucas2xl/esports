import React from "react";
import { ImageBackground, ImageBackgroundProps } from "react-native";
import { Box } from "native-base";
import bg from "../assets/background-galaxy.png";

interface BackgroundProps extends ImageBackgroundProps {
  children: React.ReactNode;
}

export const Background = ({ children, ...rest }: BackgroundProps) => {
  return (
    <Box flex="1" bg="background.800">
      <ImageBackground
        source={bg}
        defaultSource={bg}
        style={{ flex: 1 }}
        {...rest}
      >
        {children}
      </ImageBackground>
    </Box>
  );
};
