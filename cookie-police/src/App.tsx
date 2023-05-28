import Principal from "./pages/Principal";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <Principal />
    </ChakraProvider>
  );
}

export default App;
