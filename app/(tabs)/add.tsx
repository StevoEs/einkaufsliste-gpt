import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ListForm from '@/components/ListForm';
import ListItem from '@/components/ListItem';
import TotalSum from '../../components/TotalSum';
import { loadProdukte, saveProdukte } from '../../storage/storage';


const Add = () => {


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Archiv</Text>
      <Text style={styles.text}>Hier werden Einkaufslisten abgespeichert und Archiviert</Text>

    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
      backgroundColor: 'white',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      textDecorationLine: 'underline'
    },
    text: {
      
    }
  })