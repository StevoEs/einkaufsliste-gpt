import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import ListItem, { ListItemType } from './components/ListItem';
import ListForm from './components/ListForm';
import TotalSum from './components/TotalSum';

const STORAGE_KEY = 'LIST_ITEMS';

export default function MainApp() {
  const [data, setData] = useState<ListItemType[]>([]);
  const [editingItem, setEditingItem] = useState<ListItemType | null>(null);

  // Laden und Speichern wie gehabt...
  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedItems) {
          setData(JSON.parse(storedItems));
        }
      } catch (error) {
        console.error('Fehler beim Laden der Daten', error);
      }
    };
    loadItems();
  }, []);

  useEffect(() => {
    const saveItems = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error('Fehler beim Speichern der Daten', error);
      }
    };
    saveItems();
  }, [data]);

  const handleAddItem = (item: ListItemType) => {
    setData(prev => [item, ...prev]);
  };

  const handleUpdateItem = (updatedItem: ListItemType) => {
    setData(prev => prev.map(item => (item.id === updatedItem.id ? updatedItem : item)));
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  // Wenn ein Artikel editiert werden soll
  const handleEditItem = (item: ListItemType) => {
    setEditingItem(item);
  };

  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<ListItemType>) => (
      <ListItem
        item={item}
        drag={drag}
        isActive={isActive}
        onDelete={handleDeleteItem}
        onEdit={handleEditItem}
      />
    ),
    [handleDeleteItem]
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ListForm 
          onAddItem={handleAddItem} 
          onUpdateItem={handleUpdateItem} 
          editingItem={editingItem}
        />
        <DraggableFlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onDragEnd={({ data }) => setData(data)}
          activationDistance={5}
        />
        <View style={styles.totalSumContainer}>
          <TotalSum produkte={data} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  totalSumContainer: {
    position: 'absolute',
    bottom: 0, 
    left: 0,
    right: 0,
    padding: 16, 
    //backgroundColor: 'white', 
    alignItems: 'center',
  }
});


