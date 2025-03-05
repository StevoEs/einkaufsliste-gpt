import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListItem, { ListItemType } from './components/ListItem';
import ListForm from './components/ListForm';

const STORAGE_KEY = 'LIST_ITEMS';

const App = () => {
  // State-Array für Listeneinträge
  const [items, setItems] = useState<ListItemType[]>([]);

  // Beim Start: Daten aus AsyncStorage laden
  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedItems) {
          setItems(JSON.parse(storedItems));
        }
      } catch (error) {
        console.error('Fehler beim Laden der Daten', error);
      }
    };
    loadItems();
  }, []);

  // Bei Änderungen: Daten im AsyncStorage speichern
  useEffect(() => {
    const saveItems = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error('Fehler beim Speichern der Daten', error);
      }
    };
    saveItems();
  }, [items]);

  // Fügt ein neues Element zur Liste hinzu
  const handleAddItem = (item: ListItemType) => {
    setItems(prevItems => [item, ...prevItems]);
  };

  // Löscht ein Element aus der Liste
  const handleDeleteItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Sortierfunktion: Verschiebt ein Element von fromIndex nach toIndex
  const handleSortItems = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    setItems(prevItems => {
      const updated = [...prevItems];
      const movedItem = updated.splice(fromIndex, 1)[0];
      updated.splice(toIndex, 0, movedItem);
      return updated;
    });
  };

  // Render-Funktion für FlatList mit expliziten Typen für item und index
  const renderItem = useCallback(({ item, index }: { item: ListItemType; index: number }) => (
    <ListItem 
      item={item}
      index={index}
      onDelete={handleDeleteItem}
      onSort={handleSortItems}
    />
  ), [items]);

  return (
    <SafeAreaView style={styles.container}>
      <ListForm onAddItem={handleAddItem} />
      <FlatList 
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default App;