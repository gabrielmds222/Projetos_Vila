import React, { useState } from "react";
import { AspectRatio, Box, Center, Input } from "native-base";

interface PesquisaProps {
  onFilter: (text: string) => void;
}

const Pesquisa = ({ onFilter }: PesquisaProps) => {
  const [searchText, setSearchText] = useState("");

  const handleFilterChange = (text: string) => {
    setSearchText(text);
    onFilter(text);
  };

  return (
    <Box alignItems="center">
      <Input
        mx="3"
        placeholder="Pesquise aqui..."
        w="100%"
        color="#fff"
        value={searchText}
        onChangeText={handleFilterChange}
      />
    </Box>
  );
};

export default Pesquisa;
