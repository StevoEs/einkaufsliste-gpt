import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Button, StyleSheet, Keyboard } from 'react-native';
import uuid from 'react-native-uuid';
import { ListItemType } from './ListItem';

interface ListFormProps {
  onAddItem: (item: ListItemType) => void;
  onUpdateItem: (item: ListItemType) => void;
  editingItem?: ListItemType | null;
}

const ListForm: React.FC<ListFormProps> = ({ onAddItem, onUpdateItem, editingItem = null }) => {
  const [name, setName] = useState(editingItem ? editingItem.name : '');
  const [price, setPrice] = useState(editingItem ? editingItem.price.toString() : '');
  const [quantity, setQuantity] = useState(editingItem ? editingItem.quantity.toString() : '1');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Aktualisiere die Felder, wenn sich editingItem ändert
  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setPrice(editingItem.price.toString());
      setQuantity(editingItem.quantity.toString());
    } else {
      setName('');
      setPrice('');
      setQuantity('1');
    }
  }, [editingItem]);

  // Referenzen für die Eingabefelder
  const nameInputRef = useRef<TextInput>(null);
  const priceInputRef = useRef<TextInput>(null);
  const quantityInputRef = useRef<TextInput>(null);

  const handleSubmit = () => {
    if (isSubmitting) return; // Verhindert doppelte Submissions
    setIsSubmitting(true);
    
    if (!name || !price || !quantity) {
      setIsSubmitting(false);
      return;
    }

    const parsedPrice = parseFloat(price);
    const parsedQuantity = parseInt(quantity, 10);

    if (isNaN(parsedPrice) || isNaN(parsedQuantity)) {
      alert('Preis und Menge müssen Zahlen sein');
      setIsSubmitting(false);
      return;
    }

    if (editingItem) {
      const updatedItem: ListItemType = {
        ...editingItem,
        name,
        price: parsedPrice,
        quantity: parsedQuantity,
      };
      onUpdateItem(updatedItem);
    } else {
      const newItem: ListItemType = {
        id: uuid.v4() as string,
        name,
        price: parsedPrice,
        quantity: parsedQuantity,
      };
      onAddItem(newItem);
    }

    // Felder zurücksetzen und Tastatur schließen
    setName('');
    setPrice('');
    setQuantity('1');
    Keyboard.dismiss();

    // Leicht verzögert den Fokus zurücksetzen und den Submitting-Flag freigeben
    setTimeout(() => {
      nameInputRef.current?.focus();
      setIsSubmitting(false);
    }, 100);
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
      <Button title={editingItem ? "Aktualisieren" : "Hinzufügen"} onPress={handleSubmit} />
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
