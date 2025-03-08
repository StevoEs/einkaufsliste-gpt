import { Stack } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

// Verhindere automatisches Ausblenden
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    hideSplash();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
