import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Produkt } from '../src/types'; // Stelle sicher, dass der Pfad korrekt ist

interface TotalSumProps {
  produkte: Produkt[];
}

const TotalSum: React.FC<TotalSumProps> = ({ produkte }) => {
  const total = produkte.reduce((acc, produkt) => acc + produkt.price * produkt.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.totalText}>
        Gesamtsumme: {total.toFixed(2)} €
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TotalSum;