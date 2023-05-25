import React from "react";
import { StatusBar } from "expo-status-bar";
import { Box, Text, ScrollView } from "native-base";

const Principal = () => {
  return (
    <>
      <Box bg="red.500" h={200} justifyContent="center" alignItems="center">
        <Text>Opa</Text>
      </Box>
      <ScrollView flex={1}>
        <Box bg="green.500" h={700} justifyContent="center" alignItems="center">
          <Text>Conteudo</Text>
        </Box>
      </ScrollView>
      <StatusBar style="auto" />
    </>
  );
};

export default Principal;
