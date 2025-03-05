import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { Animated, TouchableOpacity, View, StyleSheet } from 'react-native';

const ListItem = () => {
  // Animated.Value für die horizontale Bewegung des itemContainers
  const itemContainerTranslateX = useRef(new Animated.Value(0)).current;
  // Animated.Value für die Hintergrundfarbe/Abdunklung des itemContainers
  const backgroundColorAnim = useRef(new Animated.Value(1)).current;

  const handleSortPress = () => {
    Animated.parallel([
      // 1. Animation für den itemContainer: Horizontale Bewegung
      Animated.timing(itemContainerTranslateX, {
        toValue: 50, // Beispielwert: Bewegung um 50 Punkte nach rechts
        duration: 300, // Animationsdauer in Millisekunden
        useNativeDriver: true, // Performance-Optimierung für Transformationen (Bewegung)
      }),
      // 2. Animation für den itemContainer: Abdunklung der Hintergrundfarbe
      Animated.timing(backgroundColorAnim, {
        toValue: 0, // Zielwert für "abgedunkelten" Zustand (gemäß inputRange in interpolate)
        duration: 300,
        useNativeDriver: false, // backgroundColor unterstützt Native Driver nicht immer zuverlässig
      }),
      // 3. (Optional) Hier könnten Sie eine bestehende Icon-Animation hinzufügen, falls vorhanden
      //     Beispiel: Animated.timing(iconDrehung, { ... }),
    ]).start(() => {
      // **WICHTIG:** Animation ist abgeschlossen. Hier können Sie Ihre Sortierlogik ausführen!
      console.log("Sortier-Animation abgeschlossen - Hier Sortierlogik einfügen!");
      // Führen Sie hier Ihre Sortierfunktion aus, um die Liste neu zu sortieren.
      // z.B.  props.onSortItem(item.id);  oder ähnliches, abhängig von Ihrer App-Architektur.


      // Reset-Animationen, um den itemContainer und ggf. das Icon in den Normalzustand zurückzuführen
      Animated.parallel([
        Animated.timing(itemContainerTranslateX, {
          toValue: 0, // Zurück zur Ausgangsposition (keine Bewegung)
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundColorAnim, {
          toValue: 1, // Zurück zum normalen Farbton (nicht abgedunkelt)
          duration: 300,
          useNativeDriver: false,
        }),
        // (Optional) Reset der Icon-Animation, falls vorhanden (z.B. Icon-Drehung zurücksetzen)
      ]).start();
    });
  };

  return (
    <Animated.View
      style={[
        styles.itemContainer,
        {
          transform: [{ translateX: itemContainerTranslateX }], // Animation der horizontalen Bewegung
          backgroundColor: backgroundColorAnim.interpolate({ // Animation der Hintergrundfarbe (Abdunklung)
            inputRange: [0, 1], // Input-Werte für Animated.Value (0 = abgedunkelt, 1 = normal)
            outputRange: ['rgba(0,0,0,0.2)', 'rgba(255,255,255,1)'], // Output-Farbbereich: von leicht grau (abgedunkelt) zu weiß (normal)
            // **Anpassen:** Farben und Alpha-Werte hier nach Ihrem gewünschten Design ändern!
          }),
        },
      ]}
    >
      <View style={styles.content}>
        {/* Hier könnte der Inhalt Ihres Listenelements stehen, z.B. Text, Checkbox usw. */}
        <View style={{height: 20, width: '80%', backgroundColor: '#eee', marginBottom: 5}}/>
        <View style={{height: 20, width: '60%', backgroundColor: '#ddd'}}/>
      </View>
      <TouchableOpacity style={styles.iconContainer} onPress={handleSortPress}>
        <View style={styles.sortIcon} /> {<Ionicons name="reorder-three" size={24} color="gray" />}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white', // Standard Hintergrundfarbe des Containers
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row', // Inhalt horizontal anordnen (für Icon rechts)
    alignItems: 'center', // Inhalt vertikal zentrieren
    elevation: 2, // Leichter Schatten für bessere Abhebung
  },
  content: {
    flex: 1, // Nimmt den verfügbaren Platz ein (alles außer Icon)
    marginRight: 10, // Abstand zum Icon
  },
  iconContainer: {
    padding: 8, // Padding um das Icon herum für bessere Touch-Fläche
  },
  sortIcon: {
    width: 25, // Breite des Icons
    height: 25, // Höhe des Icons
    backgroundColor: 'lightblue', // Beispielhafte Hintergrundfarbe für das Icon
    borderRadius: 12.5, // Abgerundete Ecken für ein kreisförmiges Icon (optional)
    // **Anpassen:** Ersetzen Sie dies durch Ihr tatsächliches Icon (z.B. Image oder Vector Icon)
  },
});

export default ListItem;