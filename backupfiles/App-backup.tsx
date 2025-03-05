import React, { useState, useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedGestureHandler,
  runOnJS,
  useAnimatedScrollHandler
} from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

interface Product {
  id: string;
  name: string;
}

type GestureContext = {
  offsetY: number;
  itemID: string;
  startIndex: number;
};

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProductName, setNewProductName] = useState('');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editedProductName, setEditedProductName] = useState('');

  const addProduct = () => {
    if (newProductName.trim() !== '') {
      setProducts([...products, { id: Date.now().toString(), name: newProductName.trim() }]);
      setNewProductName('');
    }
  };

  const startEdit = (product: Product) => {
    setEditingProductId(product.id);
    setEditedProductName(product.name);
  };

  const saveEdit = (id: string) => {
    const updatedProducts = products.map(p =>
      p.id === id ? { ...p, name: editedProductName } : p
    );
    setProducts(updatedProducts);
    setEditingProductId(null);
    setEditedProductName('');
  };

  const cancelEdit = () => {
    setEditingProductId(null);
    setEditedProductName('');
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const renderRightActions = (_progress: any, _dragX: any, itemID: any) => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          Alert.alert(
            "Produkt löschen",
            "Möchtest du dieses Produkt wirklich löschen?",
            [
              { text: "Abbrechen", style: "cancel" },
              { text: "Löschen", onPress: () => deleteProduct(itemID) }
            ]
          );
        }}
      >
        <Text style={styles.deleteButtonText}>Löschen</Text>
      </TouchableOpacity>
    );
  };

  const positions = useSharedValue(
    products.reduce((acc, product, index) => {
      acc[product.id] = index;
      return acc;
    }, {} as Record<string, number>)
  );

  const scrollY = useSharedValue(0);
  const flatListRef = useRef<FlatList<Product>>(null);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

    const handleGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, GestureContext>(
    {
      onStart: (event, ctx) => {
        const itemID = Object.keys(positions.value).find(key => positions.value[key] ===  Math.round(event.y / 50)); // Find by position
        if (!itemID) return;

        ctx.itemID = itemID;
        ctx.startIndex = positions.value[itemID];
        ctx.offsetY = ctx.startIndex * 50;
      },
      onActive: (event, ctx) => {
        if (!ctx.itemID) return;

        const newPosition = ctx.offsetY + event.translationY;
        let newIndex = Math.max(0, Math.min(products.length - 1, Math.round(newPosition / 50)));

        positions.value[ctx.itemID] = newPosition / 50;

        for (const id in positions.value) {
          if (id === ctx.itemID) continue;

          const otherPosition = positions.value[id];
          if (newIndex < ctx.startIndex && otherPosition >= newIndex && otherPosition < ctx.startIndex) {
            positions.value[id] = otherPosition + 1;
          }
          if (newIndex > ctx.startIndex && otherPosition <= newIndex && otherPosition > ctx.startIndex) {
            positions.value[id] = otherPosition - 1;
          }
        }

        positions.value = { ...positions.value };
      },
      onEnd: (event, ctx) => {
        if (!ctx.itemID) return;
        const finalIndex = positions.value[ctx.itemID];

        runOnJS(setProducts)((prevProducts) => {
          const item = prevProducts.find((p) => p.id === ctx.itemID);
          if (!item) return prevProducts;

          const sortedProducts = [...prevProducts];
          sortedProducts.splice(ctx.startIndex, 1);
          sortedProducts.splice(Math.round(finalIndex), 0, item);

          const newPositions = sortedProducts.reduce((acc, p, index) => {
            acc[p.id] = index;
            return acc;
          }, {} as Record<string, number>);
          positions.value = newPositions;

          return sortedProducts;
        });
      },
    },
    [products, positions]
  );

    const renderItem = useCallback(
    ({ item }: { item: Product }) => {
      const animatedStyle = useAnimatedStyle(() => {
        const y = positions.value[item.id] * 50; // Use item height or a constant

        return {
          transform: [{ translateY: withTiming(y) }],
          zIndex: positions.value[item.id] === Math.round(scrollY.value /50) ? 100 : 1, // Correct zIndex
          elevation: positions.value[item.id] === Math.round(scrollY.value /50) ? 5 : 1, // Correct elevation

        };
      });

      return (
        <PanGestureHandler onGestureEvent={handleGesture} key={item.id}>
          <Animated.View style={[styles.itemContainer, animatedStyle]}>
            <Swipeable
              renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item.id)}
              friction={2}
              overshootRight={false}
            >
              <View style={styles.innerItemContainer}>
                {editingProductId === item.id ? (
                  <>
                    <TextInput
                      style={styles.editInput}
                      value={editedProductName}
                      onChangeText={setEditedProductName}
                      autoFocus
                      onSubmitEditing={() => saveEdit(item.id)}
                    />
                    <TouchableOpacity onPress={() => saveEdit(item.id)}>
                      <Ionicons name="checkmark" size={24} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={cancelEdit}>
                      <Ionicons name="close" size={24} color="red" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <TouchableOpacity onPress={() => startEdit(item)}>
                      <Ionicons name="pencil" size={24} color="blue" />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </Swipeable>
            <View style={styles.iconContainer}>
              <Ionicons name="reorder-three" size={24} color="gray" />
            </View>
          </Animated.View>
        </PanGestureHandler>
      );
    },
    [editingProductId, editedProductName, products, positions, handleGesture]
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Neues Produkt hinzufügen"
          value={newProductName}
          onChangeText={setNewProductName}
          onSubmitEditing={addProduct}
        />
        <Button title="Hinzufügen" onPress={addProduct} />
      </View>
      <Animated.FlatList
        ref={flatListRef}
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#f0f0f0',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  innerItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  itemText: {
    flex: 1,
    fontSize: 18,
  },
  editInput: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
  deleteButtonText: {
    color: 'white',
  },
  iconContainer: {
    paddingHorizontal: 10
  },
});