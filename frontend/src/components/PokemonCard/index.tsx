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
interface Pokemon {
  name: string;
  image: string;
  id: number;
  types: string[];
}

interface PokemonCardProps {
  pokemon: Pokemon;
  onPokemonClick: (pokemon: Pokemon) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onPokemonClick,
}) => {
  const handlePokemonClick = () => {
    onPokemonClick(pokemon);
  };

  return (
    <Card maxW="sm" onClick={handlePokemonClick}>
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
    </Card>
  );
};

export default PokemonCard;
