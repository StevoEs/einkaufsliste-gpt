import React, { useState, useRef } from 'react';
import { View, TextInput, Button, StyleSheet, Keyboard } from 'react-native';
import uuid from 'react-native-uuid';
import { ListItemType } from './ListItem';

interface ListFormProps {
  onAddItem: (item: ListItemType) => void;
}

const ListForm: React.FC<ListFormProps> = ({ onAddItem }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('1');

  // Referenzen für die Eingabefelder
  const nameInputRef = useRef<TextInput>(null);
  const priceInputRef = useRef<TextInput>(null);
  const quantityInputRef = useRef<TextInput>(null);

  // Funktion zum Speichern des Eintrags
  const handleSubmit = () => {
    if (!name || !price || !quantity) return;

    const parsedPrice = parseFloat(price);
    const parsedQuantity = parseInt(quantity, 10);

    if (isNaN(parsedPrice) || isNaN(parsedQuantity)) {
      alert('Preis und Menge müssen Zahlen sein');
      return;
    }

    const newItem: ListItemType = {
      id: uuid.v4() as string,
      name,
      price: parsedPrice,
      quantity: parsedQuantity,
    };
    onAddItem(newItem);

    // Felder zurücksetzen
    setName('');
    setPrice('');
    setQuantity('1');
    Keyboard.dismiss(); // Tastatur schließen

    // Fokus auf das Namen-Feld setzen
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 100); // Kurze Verzögerung für die Tastatur
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        ref={nameInputRef}
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        returnKeyType="next"
        onSubmitEditing={() => priceInputRef.current?.focus()}
      />
      <TextInput
        ref={priceInputRef}
        style={styles.input}
        placeholder="Preis"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        returnKeyType="next"
        onSubmitEditing={() => quantityInputRef.current?.focus()}
      />
      <TextInput
        ref={quantityInputRef}
        style={styles.input}
        placeholder="Menge"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        returnKeyType="done"
        onSubmitEditing={handleSubmit} // Speichern auslösen
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
