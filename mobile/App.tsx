import { StatusBar } from "expo-status-bar";
import Principal from "./src/pages/Principal";
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <Principal />
    </NativeBaseProvider>
  );
}
