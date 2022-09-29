import React, { useEffect, useRef } from "react";
import "react-native-gesture-handler";
import * as Notification from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import { Subscription } from "expo-modules-core";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_500Medium,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import "./src/services/notificationConfig";
import { Loading } from "./src/components/Loading";
import { extendTheme, NativeBaseProvider } from "native-base";
import { config } from "./src/theme/config";
import { theme } from "./src/theme/theme";
import { Routes } from "./src/routes";
import { getPushNotificationToken } from "./src/services/getPushNotificationToken";

export default function App() {
  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  }, []);

  useEffect(() => {
    getNotificationListener.current =
      Notification.addNotificationReceivedListener((notification) =>
        console.log(notification)
      );

    responseNotificationListener.current =
      Notification.addNotificationResponseReceivedListener((response) =>
        console.log(response)
      );

    return () => {
      getNotificationListener.current?.remove();
      responseNotificationListener.current?.remove();
    };
  }, []);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_500Medium,
    Inter_800ExtraBold,
  });
  const newTheme = extendTheme(theme);

  return (
    <NativeBaseProvider theme={newTheme} config={config}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}
