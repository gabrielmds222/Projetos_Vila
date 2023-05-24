import { Grid, GridItem } from "@chakra-ui/react";
import PokemonCard from "../components/PokemonCard";
import Pesquisa from "../components/Pesquisa";

export default function Home() {
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
      <GridItem pl="2" bg="orange.300" area={"header"}>
        <Pesquisa />
      </GridItem>
      <GridItem pl="2" m={5} area={"main"}>
        <PokemonCard />
      </GridItem>
    </Grid>
  );
}
