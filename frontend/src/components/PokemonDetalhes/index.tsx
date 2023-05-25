import {
  Box,
  Center,
  Card,
  CardBody,
  CardFooter,
  Button,
  Heading,
  Text,
  Stack,
  Divider,
  ButtonGroup,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

interface PokemonDetails {
  height: number;
  weight: number;
}

const PokemonDetalhes = () => {
  const router = useRouter();
  const { name, id, types, image } = router.query;
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
          const { height, weight } = response.data;
          setPokemonDetails({
            height,
            weight,
          });
        } catch (error) {
          console.log(error);
        }
      };

      getPokemonDetails();
    }
  }, [name]);

  return (
    <Center h="100vh">
      <Card minW={{ base: "90%", md: "80%" }} h="90%" bg="#eee">
        <CardBody>
          <Image
            src={image?.toString()}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            h={{ base: "200px", md: "300px" }}
            mx="auto"
          />
          <Stack mt="6" spacing="3" alignItems="center">
            <Heading size="lg">{name}</Heading>
            <Text color="blue.600" fontSize="2xl">
              {types}
            </Text>
            {pokemonDetails && (
              <Flex
                bg="blue.300"
                w="90%"
                justifyContent="space-between"
                alignItems="center"
              >
                <Center>
                  <Text>{pokemonDetails.height} cm</Text>
                  <Text>Height</Text>
                </Center>
                <Divider orientation="vertical" p={4} h="10px" />
                <Center>
                  <Text>{pokemonDetails.weight} kg</Text>
                  <Text>Weight</Text>
                </Center>
                <Divider orientation="vertical" p={4} h="10px" />
                <Center>
                  <Text>{pokemonDetails.weight} kg</Text>
                  <Text>Weight</Text>
                </Center>
              </Flex>
            )}
          </Stack>
        </CardBody>
      </Card>
    </Center>
  );
};

export default PokemonDetalhes;

// import { Grid, GridItem } from "@chakra-ui/react";

// const PokemonDetalhes = () => {
//   return (
//     <Grid templateRows="30% 70%" w="50%" gap={2} alignItems="center">
//       <GridItem w="100%" bg="red.500" />
//       <GridItem w="100%" bg="blue.500" />
//     </Grid>
//   );
// };

// export default PokemonDetalhes;
