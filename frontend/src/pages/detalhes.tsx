import { Grid, GridItem } from "@chakra-ui/react";

import PokemonDetalhes from "@/components/PokemonDetalhes";
import PokemonStatus from "@/components/PokemonStatus";

const Detalhes = () => {
  return (
    <Grid
      templateAreas={`"nav main"`}
      templateRows="150px 1fr 30px"
      templateColumns="30% 70%"
      h="100vh"
      gap="0"
      color="blackAlpha.700"
      fontWeight="bold"
      bg="#27282D"
    >
      <GridItem pl="2" h="100vh" area="nav">
        <PokemonDetalhes />
      </GridItem>
      <GridItem pl="2" h="100vh" area="main" mt="40px">
        <PokemonStatus />
      </GridItem>
    </Grid>
  );
};

export default Detalhes;
