// import { useRouter } from "next/router";

// const Detalhes = () => {
//   const router = useRouter();
//   const { name, id, types, image } = router.query;

//   return (
//     <>
//       <h1>Detalhes do Pokemon</h1>
//       <h2>Nome: {name}</h2>
//       <h2>ID: {id}</h2>
//       <h2>Tipo: {types}</h2>
//       <img src={image} alt={name} />
//     </>
//   );
// };

// export default Detalhes;

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
    >
      <GridItem pl="2" h="100vh" area="nav">
        <PokemonDetalhes />
      </GridItem>
      <GridItem pl="2" h="100vh" bg="pink.300" area="main">
        <PokemonStatus />
      </GridItem>
    </Grid>
  );
};

export default Detalhes;
