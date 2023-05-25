import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

interface PokemonStatusProps {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
}

interface PokemonApiResponse {
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

const PokemonStatus = () => {
  const router = useRouter();
  const { name } = router.query;
  const [pokemonDetails, setPokemonDetails] =
    useState<PokemonStatusProps | null>(null);

  useEffect(() => {
    if (name) {
      const getPokemonDetails = async () => {
        try {
          const response = await axios.get<PokemonApiResponse>(
            `https://pokeapi.co/api/v2/pokemon/${name}`
          );

          const stats = response.data.stats;
          const pokemonStats: PokemonStatusProps = {
            hp: 0,
            attack: 0,
            defense: 0,
            speed: 0,
          };

          stats.forEach((stat) => {
            switch (stat.stat.name) {
              case "hp":
                pokemonStats.hp = stat.base_stat;
                break;
              case "attack":
                pokemonStats.attack = stat.base_stat;
                break;
              case "defense":
                pokemonStats.defense = stat.base_stat;
                break;
              case "speed":
                pokemonStats.speed = stat.base_stat;
                break;
              default:
                break;
            }
          });

          setPokemonDetails(pokemonStats);
        } catch (error) {
          console.log(error);
        }
      };

      getPokemonDetails();
    }
  }, [name]);

  return (
    <Center>
      <Card w="900px" h="500px">
        <CardHeader display="flex" justifyContent="center">
          <Heading>Estatísticas</Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={5}>
            <Text>Hp</Text>
            {pokemonDetails && (
              <Progress
                colorScheme="green"
                hasStripe
                value={pokemonDetails.hp}
              />
            )}
            <Text>Attack</Text>
            {pokemonDetails && (
              <Progress
                colorScheme="green"
                hasStripe
                value={pokemonDetails.attack}
              />
            )}
            <Text>Defense</Text>
            {pokemonDetails && (
              <Progress
                colorScheme="green"
                hasStripe
                value={pokemonDetails.defense}
              />
            )}
            <Text>Speed</Text>
            {pokemonDetails && (
              <Progress
                colorScheme="green"
                hasStripe
                value={pokemonDetails.speed}
              />
            )}
          </Stack>
        </CardBody>
      </Card>
    </Center>
  );
};

export default PokemonStatus;
