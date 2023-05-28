import { FormControl, Input, Box, Center } from "@chakra-ui/react";

interface PesquisaProps {
  onFilter: (text: string) => void;
}

const Pesquisa: React.FC<PesquisaProps> = ({ onFilter }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    onFilter(searchText);
  };

  return (
    <FormControl mt={100}>
      <Center>
        <Box width="900px">
          <Input placeholder="Pesquise..." onChange={handleInputChange} />
        </Box>
      </Center>
    </FormControl>
  );
};

export default Pesquisa;
