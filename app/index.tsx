import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/(tabs)/home" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  headline: {
    fontSize: 20,
  },
  link: {
    color: 'white',
    backgroundColor: 'blue',
    fontSize: 16,
    padding: 16,
  },
});