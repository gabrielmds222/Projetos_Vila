import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Box, VStack, View, FlatList } from "native-base";
import axios from "axios";
import PokemonCard from "../../components/PokemonCard";
import Pesquisa from "../../components/Pesquisa";

interface Pokemon {
  name: string;
  image: string;
  id: number;
  types: string[];
}

const Principal = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

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

  return (
    <View flex={1} bg="#27282D">
      <Box h={200} justifyContent="center" alignItems="center">
        <Box w="80%" justifyContent="center" mt="70px">
          <Pesquisa />
        </Box>
      </Box>

      <Box h={700}>
        <FlatList
          data={pokemons}
          numColumns={2}
          renderItem={({ item }) => (
            <Box mx={2} my={2} flex={1}>
              <PokemonCard
                id={item.id}
                name={item.name}
                image={item.image}
                types={item.types}
              />
            </Box>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </Box>

      <StatusBar style="auto" />
    </View>
  );
};

export default Principal;
