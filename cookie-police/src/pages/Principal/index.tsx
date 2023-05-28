import {
  Box,
  Flex,
  Grid,
  Text,
  Image,
  Stack,
  Button,
  Alert,
} from "@chakra-ui/react";
import { Phone, Play } from "@phosphor-icons/react";
import { useState } from "react";
import Banner from "../../components/Banner";

function Principal() {
  return (
    <Grid h="100vh" templateRows="50px 170px 150px" gap={0}>
      <Box bg="#EEEBE6">
        <Box maxW="80%" mx="auto" p={4}>
          <Flex
            justifyContent="flex-end"
            alignItems="flex-end"
            gap={4}
            color="#585858"
            mt={2}
          >
            <Text mr={10} fontSize={14}>
              Em caso de falecimento ligue imediatamente para nossa Central
            </Text>
            <Play size={24} color="#585858" weight="fill" />
            <Phone size={24} color="#585858" weight="bold" />
            <Text fontSize={14}>4000.2002 ou 0800 402 2002</Text>
          </Flex>
        </Box>
      </Box>
      <Box bg="#fff">
        <Box maxW="80%" mx="auto" p={4}>
          <Flex justifyContent="space-between" alignItems="center" p={4}>
            <Image
              src="https://planosempre.com.br/assets/logo-sempre.svg"
              alt="Dan Abramov"
              w={200}
            />
            <Stack direction="row" spacing={4} align="center" color="#fff">
              <Button bg="#003B5C" variant="solid">
                Área do Cliente
              </Button>
              <Button bg="#23A2B1" variant="solid">
                Velório Virtual
              </Button>
            </Stack>
          </Flex>
        </Box>
      </Box>
      <Box bg="blue.500">
        <Image
          src="https://planosempre.com.br/assets/second-mobile-small.png"
          alt="Dan Abramov"
          boxSize="100vw"
          h="500"
          objectFit="cover"
        />
      </Box>
      <Banner />
    </Grid>
  );
}

export default Principal;
