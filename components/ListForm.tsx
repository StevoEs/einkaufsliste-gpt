import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Keyboard } from 'react-native';
import uuid from 'react-native-uuid';
import { ListItemType } from './ListItem';


interface ListFormProps {
  onAddItem: (item: ListItemType) => void;
}

const ListForm: React.FC<ListFormProps> = ({ onAddItem }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = () => {
    if (!name || !price || !quantity) return;
    const newItem: ListItemType = {
      id: uuid.v4(),
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
    };
    onAddItem(newItem);
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
