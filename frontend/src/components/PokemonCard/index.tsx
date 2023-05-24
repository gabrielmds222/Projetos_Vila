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
  Box,
  Center,
  Input,
  FormControl,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

interface Pokemon {
  name: string;
  image: string;
  id: number;
  types: string[];
}

const PokemonCard = () => {
  const router = useRouter();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchValue, setSearchValue] = useState("");

  async function getPokemons() {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
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

  const filteredPokemons = pokemons.filter((pokemon) => {
    const searchLowercase = searchValue.toLowerCase();
    return (
      pokemon.name.toLowerCase().includes(searchLowercase) ||
      pokemon.id.toString().includes(searchLowercase)
    );
  });

  const handlePokemonClick = (pokemon: Pokemon) => {
    router.push({
      pathname: "/detalhes",
      query: {
        name: pokemon.name,
        id: pokemon.id,
        types: pokemon.types.join(", "),
        image: pokemon.image,
      },
    });
    console.log(pokemon);
  };

  return (
    <>
      <FormControl mt={100}>
        <Center>
          <Box width="900px">
            <Input
              placeholder="Pesquise..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Box>
        </Center>
      </FormControl>

      <SimpleGrid
        spacing={3}
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        templateRows="repeat(auto-fill, minmax(300px, 1fr))"
      >
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <Card
              key={pokemon.name}
              maxW="sm"
              onClick={() => handlePokemonClick(pokemon)}
            >
              <CardBody>
                <Flex justify="center" bg="#eee" borderRadius="lg">
                  <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    borderRadius="lg"
                    width="60%"
                    height="60%"
                    justifySelf="center"
                  />
                </Flex>
                <Stack mt="6" spacing="3">
                  <Text color="blue.600" fontSize="2xl">
                    #{pokemon.id.toString().padStart(3, "0")}
                  </Text>
                  <Heading size="md">{pokemon.name}</Heading>
                  <Text>Tipo: {pokemon.types.join(", ")}</Text>
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
          ))
        ) : (
          <Text>Nenhum Pokemon encontrado</Text>
        )}
      </SimpleGrid>
    </>
  );
};

export default PokemonCard;
