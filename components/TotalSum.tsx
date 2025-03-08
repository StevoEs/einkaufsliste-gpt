import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItemType } from './ListItem';


interface TotalSumProps {
  produkte: ListItemType[];
}

const TotalSum: React.FC<TotalSumProps> = ({ produkte }) => {
  // Filtere alle null-Elemente heraus
  const validProdukte = produkte.filter((item) => item !== null) as ListItemType[];
  const gesamtSumme = validProdukte.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sumText}>Gesamtsumme: {gesamtSumme.toFixed(2)}€</Text>
    </View>
  );
};

export default TotalSum;


const styles = StyleSheet.create({
  container: {

  },
  sumText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  }
  })