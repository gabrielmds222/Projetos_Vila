import React, { useState, useEffect } from "react";
import {
  Box,
  ScrollView,
  VStack,
  Wrap,
  View,
  FlatList,
  Text,
} from "native-base";
import PokemonCard from "../../components/PokemonCard";
import Pesquisa from "../../components/Pesquisa";
import axios from "axios";

interface Pokemon {
  name: string;
  image: string;
  id: number;
  types: string[];
}

const Principal = () => {
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

  return (
    <View flex={1} bg="#27282D">
      <Box h={200} justifyContent="center" alignItems="center">
        <Box w="80%" justifyContent="center" mt="70px">
          <Pesquisa onFilter={handleFilter} />
        </Box>
      </Box>

      <Box
        h={700}
        justifyContent="center"
        alignItems={filteredPokemons.length === 1 ? "flex-start" : "center"}
      >
        <VStack space={2} alignItems="center">
          {filteredPokemons.length === 0 ? (
            <Text color="#fff">Nenhum Pokemon encontrado!</Text>
          ) : (
            <FlatList
              data={filteredPokemons}
              numColumns={2}
              renderItem={({ item }) => (
                <Wrap>
                  <PokemonCard
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    types={item.types}
                  />
                </Wrap>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </VStack>
      </Box>
    </View>
  );
};

export default Principal;
