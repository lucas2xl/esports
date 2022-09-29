import { Box, Spinner } from "native-base";
import React from "react";

export const Loading = () => {
  return (
    <Box flex="1" justifyContent="center" alignItems="center">
      <Spinner color="primary" />
    </Box>
  );
};
