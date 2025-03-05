import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import App from '../App';

// Splash Screen verhindern, bis die App geladen ist
SplashScreen.preventAutoHideAsync();

function Main() {
  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };

    hideSplash();
  }, []);

  return (
    <View style={styles.container}>
      <App />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Main; // **Behalte den Default Export von Main**
// **Entferne oder kommentiere diese Zeile aus:**
// import { registerRootComponent } from 'expo-router';
// registerRootComponent(Main);