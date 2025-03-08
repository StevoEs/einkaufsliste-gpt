import React from 'react';
import { View, StyleSheet } from 'react-native';
import MainApp from '../MainApp';

export default function Index() {
  return (
    <View style={styles.container}>
      <MainApp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
