import React, { useState, useEffect } from "react";
import {
  Box,
  AspectRatio,
  Center,
  Stack,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "native-base";
import axios from "axios";

interface Pokemon {
  name: string;
  image: string;
  id: number;
  types: string[];
}

const PokemonCard = ({ id, name, image, types }: Pokemon) => {
  return (
    <Box
      w="160"
      h="230"
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      m="5px"
      borderWidth="1"
      _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700",
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: "gray.50",
      }}
    >
      <Box>
        <AspectRatio w="100%" ratio={16 / 13}>
          <Image
            source={{ uri: image }}
            alt={name}
            style={{ width: 100, height: 100 }}
          />
        </AspectRatio>
      </Box>
      <Stack p="4" space={1}>
        <Stack space={2}>
          <Heading size="sm" ml="-1">
            #{id.toString().padStart(2, "0")}
          </Heading>
          <Text fontSize="lg" fontWeight="500" ml="-0.5" mt="-1">
            {name}
          </Text>
        </Stack>
        <Text fontWeight="300">Tipo: {types.join(", ")}</Text>
      </Stack>
    </Box>
  );
};

export default PokemonCard;
