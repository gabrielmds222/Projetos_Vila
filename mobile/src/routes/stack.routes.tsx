import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Principal from "../pages/Principal";
import Detalhes from "../pages/Detalhes";

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator headerMode="none" initialRouteName="principal">
      <Screen name="principal" component={Principal} />
      <Screen name="detalhes" component={Detalhes} />
    </Navigator>
  );
}
