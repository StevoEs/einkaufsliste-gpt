// app/(tabs)/home.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ListItem from '../../components/ListItem';
import TotalSum from '../../components/TotalSum';
import { loadProdukte, saveProdukte } from '../../storage/storage';
import ListForm from '@/components/ListForm';
import { Produkt } from '@/src/types';

const Home = () => {
  const [produkte, setProdukte] = useState<Produkt[]>([]);
  const [editingProduct, setEditingProduct] = useState<Produkt | null>(null);

  useEffect(() => {
    async function fetchProdukte() {
      const loaded = await loadProdukte();
      const validProducts = loaded.filter((p: Produkt | null): p is Produkt => p !== null);
      setProdukte(validProducts);
    }
    fetchProdukte();
  }, []);

  const handleSubmit = async (produkt: Omit<Produkt, 'id'>) => {
    if (editingProduct) {
      const updatedProducts = produkte.map((p) =>
        p.id === editingProduct.id ? { ...produkt, id: editingProduct.id } : p
      );
      setProdukte(updatedProducts);
      await saveProdukte(updatedProducts);
      setEditingProduct(null);
    } else {
      const newProdukt: Produkt = { ...produkt, id: Date.now().toString() };
      const updatedProducts = [...produkte, newProdukt];
      setProdukte(updatedProducts);
      await saveProdukte(updatedProducts);
    }
  };

  const handleEdit = (id: string) => {
    const productToEdit = produkte.find((p) => p.id === id);
    if (productToEdit) {
      setEditingProduct(productToEdit);
    }
  };

  const handleDelete = (id: string) => {
    const updatedProducts = produkte.filter((p) => p.id !== id);
    setProdukte(updatedProducts);
    saveProdukte(updatedProducts);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Einkaufsliste</Text>
      <ListForm onSubmit={handleSubmit} produkt={editingProduct} />
      {produkte.map((item, index) => (
        <ListItem
          key={item.id}
          item={item}
          index={index}
          onDelete={handleDelete}
          onSort={() => {}}
        />
      ))}
      <TotalSum produkte={produkte} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});