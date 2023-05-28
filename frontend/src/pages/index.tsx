import React, { useState, useEffect } from "react";
import { Grid, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import PokemonCard from "../components/PokemonCard";
import Pesquisa from "../components/Pesquisa";
import axios from "axios";
import { useRouter } from "next/router";

interface Pokemon {
  name: string;
  image: string;
  id: number;
  types: string[];
}

export default function Home() {
  const router = useRouter();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);

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
      setFilteredPokemons(updatedPokemons);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPokemons();
  }, []);

  const handleFilter = (text: string) => {
    const filtered = pokemons.filter((pokemon) => {
      const nameMatch = pokemon.name.toLowerCase().includes(text.toLowerCase());
      const idMatch = pokemon.id.toString().includes(text);
      return nameMatch || idMatch;
    });
    setFilteredPokemons(filtered);
  };

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
    <Grid
      templateAreas={`"header header"
                  "main main"`}
      gridTemplateRows={"250px 1fr 30px"}
      gridTemplateColumns={"150px 1fr"}
      h="100%"
      gap="0"
      bg="#27282D"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem pl="2" area={"header"}>
        <Pesquisa onFilter={handleFilter} />
      </GridItem>
      <GridItem pl="2" m={5} area={"main"}>
        <SimpleGrid
          spacing={3}
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          templateRows="repeat(auto-fill, minmax(300px, 1fr))"
        >
          {filteredPokemons.length > 0 ? (
            filteredPokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                pokemon={pokemon}
                onPokemonClick={handlePokemonClick}
              />
            ))
          ) : (
            <Text color="#fff">Nenhum Pokemon foi encontrado</Text>
          )}
        </SimpleGrid>
      </GridItem>
    </Grid>
  );
}
