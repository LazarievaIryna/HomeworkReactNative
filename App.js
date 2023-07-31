// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import store from './redux/store';
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import Routes from './Routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require("./assets/fonts/Roboto-Medium.ttf"),
    'Roboto-Regular': require("./assets/fonts/Roboto-Regular.ttf"),
    'Roboto-Bold': require("./assets/fonts/Roboto-Bold.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    
    
    <Provider store={store}>
      <View style={styles.container} onLayout={onLayoutRootView}>
      <Routes />
      </View>
    </Provider>
    
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // position:'relative'
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  
});
