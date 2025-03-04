// components/ListForm.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Keyboard } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { ListItemType } from './ListItem';

interface ListFormProps {
  onAddItem: (item: ListItemType) => void;
}

const ListForm: React.FC<ListFormProps> = ({ onAddItem }) => {
  // Zustände für die Input-Felder
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  // Beim Absenden: Neues Element erstellen und an den Parent übergeben
  const handleSubmit = () => {
    if (!name || !price || !quantity) return;
    const newItem: ListItemType = {
      id: uuidv4(),
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
    };
    onAddItem(newItem);
    // Input-Felder zurücksetzen
    setName('');
    setPrice('');
    setQuantity('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.formContainer}>
      <TextInput 
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput 
        style={styles.input}
        placeholder="Preis"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput 
        style={styles.input}
        placeholder="Menge"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <Button title="Hinzufügen" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 8,
    paddingHorizontal: 8,
    height: 40,
  },
});

export default ListForm;
