import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'; // Alternativ: eine andere Icon-Bibliothek

export interface ListItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ListItemProps {
  item: ListItemType;
  index: number;
  onDelete: (id: string) => void;
  onSort: (fromIndex: number, toIndex: number) => void;
}

const ITEM_HEIGHT = 70;
const SWIPE_THRESHOLD = 100;

const ListItem: React.FC<ListItemProps> = ({ item, index, onDelete, onSort }) => {
  const translateX = useSharedValue(0);
  const dragY = useSharedValue(0);

  const swipeGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (translateX.value > SWIPE_THRESHOLD) {
        translateX.value = withTiming(
          Dimensions.get('window').width,
          {},
          () => runOnJS(onDelete)(item.id)
        );
      } else {
        translateX.value = withTiming(0);
      }
    });

  const dragGesture = Gesture.Pan()
    .onStart(() => {})
    .onUpdate((event) => {
      dragY.value = event.translationY;
      const newIndex = Math.min(
        Math.max(Math.floor((index * ITEM_HEIGHT + dragY.value) / ITEM_HEIGHT), 0),
        100
      );
      if (newIndex !== index) {
        runOnJS(onSort)(index, newIndex);
      }
    })
    .onEnd(() => {
      dragY.value = withTiming(0);
    });

  const animatedSwipeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedDragStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: dragY.value }],
  }));

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={swipeGesture}>
        <Animated.View style={[styles.itemContainer, animatedSwipeStyle]}>
          <View style={styles.itemContent}>
            <View>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemSubText}>
                Preis: {item.price} | Menge: {item.quantity}
              </Text>
            </View>
            <GestureDetector gesture={dragGesture}>
              <Animated.View style={[styles.iconContainer, animatedDragStyle]}>
                <Ionicons name="reorder-three" size={24} color="gray" />
              </Animated.View>
            </GestureDetector>
          </View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    borderBottomWidth: 1,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    height: ITEM_HEIGHT,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemSubText: {
    fontSize: 14,
    color: '#888',
  },
  iconContainer: {
    padding: 8,
  },
});

export default ListItem;
