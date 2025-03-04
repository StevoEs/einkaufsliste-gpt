import AsyncStorage from '@react-native-async-storage/async-storage';
import { Produkt } from '../src/types';

export const loadProdukte = async (): Promise<Produkt[]> => {
const existingProduktsString = await AsyncStorage.getItem('produkte');
return existingProduktsString ? JSON.parse(existingProduktsString) : [];
};

export const saveProdukte = async (produkte: Produkt[]): Promise<void> => {
await AsyncStorage.setItem('produkte', JSON.stringify(produkte));
};