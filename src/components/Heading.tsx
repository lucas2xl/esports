import { Box, IBoxProps, Text } from "native-base";
import React from "react";

interface HeadingProps extends IBoxProps {
  title: string;
  subtitle: string;
}
export const Heading = ({ title, subtitle, ...rest }: HeadingProps) => {
  return (
    <Box w="full" p="4" {...rest}>
      <Text color="text" fontSize="2xl" fontWeight="black">
        {title}
      </Text>
      <Text color="caption.400" fontSize="lg">
        {subtitle}
      </Text>
    </Box>
  );
};
