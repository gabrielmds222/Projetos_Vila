import { StatusBar } from "expo-status-bar";
import Principal from "./src/pages/Principal";
import { NativeBaseProvider } from "native-base";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <NativeBaseProvider>
      <Routes />
    </NativeBaseProvider>
  );
}
