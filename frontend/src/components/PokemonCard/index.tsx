import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Heading,
  SimpleGrid,
  Text,
  Stack,
  Divider,
  ButtonGroup,
  Image,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

interface Pokemon {
  name: string;
  image: string;
  id: number;
  types: string[];
}

const PokemonCard = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  async function getPokemons() {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=50"
      );
      const pokemonData = response.data.results;

      const updatedPokemons = await Promise.all(
        pokemonData.map(async (pokemon: { name: string; url: string }) => {
          const pokemonResponse = await axios.get(pokemon.url);
          const { id, types } = pokemonResponse.data;
          const image = pokemonResponse.data.sprites.front_default;
          return {
            name: pokemon.name,
            image: image,
            id: id,
            types: types.map(
              (type: { type: { name: string } }) => type.type.name
            ),
          };
        })
      );

      setPokemons(updatedPokemons);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPokemons();
  }, []);

  // if (pokemons.length === 0) {
  //   return <div>Loading...</div>;
  // }

  return (
    <SimpleGrid
      spacing={3}
      templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      templateRows="repeat(auto-fill, minmax(300px, 1fr))"
    >
      {pokemons.map((pokemon) => (
        <Card key={pokemon.name} maxW="sm">
          <CardBody>
            <Image src={pokemon.image} alt={pokemon.name} borderRadius="lg" />
            <Stack mt="6" spacing="3">
              <Text color="blue.600" fontSize="2xl">
                *{pokemon.id.toString().padStart(3, "0")}
              </Text>
              <Heading size="md">{pokemon.name}</Heading>
              <Text>Type: {pokemon.types.join(", ")}</Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button variant="solid" colorScheme="blue">
                Buy now
              </Button>
              <Button variant="ghost" colorScheme="blue">
                Add to cart
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default PokemonCard;
