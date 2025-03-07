import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { RenderItemParams } from 'react-native-draggable-flatlist';




export interface ListItemType { 
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Wir übernehmen nur die benötigten Props aus RenderItemParams
export interface ListItemProps extends Pick<RenderItemParams<ListItemType>, 'item' | 'drag' | 'isActive'> {
  onDelete: (id: string) => void;
}

const ListItem: React.FC<ListItemProps> = ({ item, drag, isActive, onDelete }) => {
  const renderSwipeableContent = () => (
    <View style={styles.actionContainer}>
      <Text style={styles.actionText}>Löschen</Text>
    </View>
  );
  const gesamtPreis = (item.quantity * item.price).toFixed(2);
  return (
    <Swipeable
      renderLeftActions={renderSwipeableContent}
      renderRightActions={renderSwipeableContent}
      onSwipeableOpen={() => onDelete(item.id)}
    >
      <TouchableOpacity
        onLongPress={drag}
        disabled={isActive}
        style={[
          styles.itemContainer,
          { backgroundColor: isActive ? '#e0e0e0' : 'white' },
        ]}
      >
        <View style={styles.textContainer}>
          <Text style={styles.itemText}>{item.quantity}x {item.name}</Text>
          <Text style={styles.itemSubText}>
            Preis: {item.price} € | Gesamtpreis: <Text style={{ fontWeight: 'bold' }}>{gesamtPreis} €</Text>
          </Text>
        </View>
        <TouchableOpacity onPress={drag}>
          <Ionicons name="reorder-three" size={24} color="gray" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  itemText: {
    fontSize: 16,
  },
  itemSubText: {
    fontSize: 12,
    color: 'gray',
  },
  actionContainer: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default React.memo(ListItem);
