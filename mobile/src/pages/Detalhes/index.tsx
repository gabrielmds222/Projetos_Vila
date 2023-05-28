import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Image,
  Button,
  ArrowBackIcon,
  Divider,
  Progress,
  VStack,
  Center,
  ScrollView,
} from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

interface PokemonDetails {
  height: number;
  weight: number;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
}

const Detalhes = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { id, name, image, types, height, weight } = route.params;

  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );

  useEffect(() => {
    if (name) {
      const getPokemonDetails = async () => {
        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${name}`
          );
          const { height, weight, stats } = response.data;
          const hp = stats.find(
            (stat: any) => stat.stat.name === "hp"
          ).base_stat;
          const attack = stats.find(
            (stat: any) => stat.stat.name === "attack"
          ).base_stat;
          const defense = stats.find(
            (stat: any) => stat.stat.name === "defense"
          ).base_stat;
          const speed = stats.find(
            (stat: any) => stat.stat.name === "speed"
          ).base_stat;
          setPokemonDetails({
            height,
            weight,
            stats: {
              hp,
              attack,
              defense,
              speed,
            },
          });
        } catch (error) {
          console.log(error);
        }
      };

      getPokemonDetails();
    }
  }, [name]);

  function handleBack() {
    navigation.goBack();
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Box flex={1} alignItems="center" bg="#27282D">
        <Box
          display="flex"
          width="100%"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          marginTop="15px"
        >
          <Button
            margin="20px"
            backgroundColor="transparent"
            onPress={handleBack}
          >
            <ArrowBackIcon color="#fff" />
          </Button>
          <Text fontSize="24px" color="#fff">
            {name}
          </Text>
        </Box>
        <Box width={250} height={250}>
          <Image
            source={{ uri: image }}
            alt={name}
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        <Box display="flex" justifyContent="center">
          <Text color="#fff" fontSize="24px">
            {types.join(", ")}
          </Text>
        </Box>
        <Box
          flexDirection="row"
          width="60%"
          justifyContent="space-between"
          marginTop={4}
        >
          <Box
            flex={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontSize="24px" color="#eee">
              {pokemonDetails?.height} Cm
            </Text>
            <Text fontSize="18px" color="#eee">
              Altura:
            </Text>
          </Box>
          <Divider orientation="vertical" />
          <Box flex={1} alignItems="center">
            <Text fontSize="24px" color="#eee">
              {pokemonDetails?.weight} Kg
            </Text>
            <Text fontSize="18px" color="#eee">
              Peso:
            </Text>
          </Box>
        </Box>

        <Center w="100%" mt="10">
          <Box w="90%" maxW="400">
            <VStack space="md">
              <VStack mx="4" space="md">
                <Text color="#eee">HP: </Text>
                <Progress
                  colorScheme="primary"
                  value={pokemonDetails?.stats.hp}
                />
                <Text color="#eee">Attack:</Text>
                <Progress
                  colorScheme="secondary"
                  value={pokemonDetails?.stats.attack}
                />
                <Text color="#eee">Defense:</Text>
                <Progress
                  colorScheme="emerald"
                  value={pokemonDetails?.stats.defense}
                />
                <Text color="#eee">Speed: </Text>
                <Progress
                  colorScheme="warning"
                  value={pokemonDetails?.stats.speed}
                  marginBottom={20}
                />
              </VStack>
            </VStack>
          </Box>
        </Center>
      </Box>
    </ScrollView>
  );
};

export default Detalhes;
