// In ListForm.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Produkt } from '../src/types'; // Passe den Pfad an.

interface ListFormProps {
    onSubmit: (produkt: Omit<Produkt, 'id'>) => Promise<void>;
    produkt: Produkt | null;
}

const ListForm: React.FC<ListFormProps> = ({ onSubmit, produkt }) => {
    const [name, setName] = useState(produkt ? produkt.name : '');
    const [price, setPrice] = useState(produkt ? produkt.price.toString() : '');
    const [quantity, setQuantity] = useState(produkt ? produkt.quantity.toString() : '');

    const handleSubmit = () => {
        const newProdukt: Omit<Produkt, 'id'> = {
            name,
            price: parseFloat(price),
            quantity: parseInt(quantity),
        };
        onSubmit(newProdukt);
        setName('');
        setPrice('');
        setQuantity('');
    };

    return (
        <View style={styles.container}>
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
    container: {
        padding: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default ListForm;