import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Home } from "../screens/home/Home";
import { Game } from "../screens/game/Game";

const { Navigator, Screen } = createStackNavigator();

export const AppRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "transparent" },
        presentation: "transparentModal",
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: "clamp",
            }),
          },
        }),
      }}
      initialRouteName="Home"
    >
      <Screen
        name="Home"
        component={Home}
        options={TransitionPresets.ScaleFromCenterAndroid}
      />
      <Screen
        name="Game"
        component={Game}
        options={TransitionPresets.ScaleFromCenterAndroid}
      />
    </Navigator>
  );
};
