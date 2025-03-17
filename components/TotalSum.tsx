import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { ListItemType } from './ListItem';

const DIGIT_HEIGHT = 30; // Höhe einer Ziffer (anpassbar)

interface RollingDigitProps {
  digit: number;
}

const RollingDigit: React.FC<RollingDigitProps> = ({ digit }) => {
  const [currentDigit, setCurrentDigit] = useState<number>(digit);
  const [displayDigits, setDisplayDigits] = useState<number[]>([digit]);
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (digit === currentDigit) return;

    let sequence: number[] = [];
    if (digit >= currentDigit) {
      for (let d = currentDigit; d <= digit; d++) {
        sequence.push(d);
      }
    } else {
      // Beispiel: von 8 zu 2 (8, 9, 0, 1, 2)
      for (let d = currentDigit; d <= 9; d++) {
        sequence.push(d);
      }
      for (let d = 0; d <= digit; d++) {
        sequence.push(d);
      }
    }
    setDisplayDigits(sequence);

    Animated.timing(translateY, {
      toValue: - (sequence.length - 1) * DIGIT_HEIGHT,
      duration: (sequence.length - 1) * 100, // 100ms pro Ziffer (anpassbar)
      useNativeDriver: true,
    }).start(() => {
      // Nach der Animation: Aktuelle Ziffer übernehmen und Animation zurücksetzen
      setCurrentDigit(digit);
      setDisplayDigits([digit]);
      translateY.setValue(0);
    });
  }, [digit, currentDigit, translateY]);

  return (
    <View style={{ height: DIGIT_HEIGHT, overflow: 'hidden' }}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {displayDigits.map((d: number, index: number) => (
          <Text key={index} style={styles.digitText}>{d}</Text>
        ))}
      </Animated.View>
    </View>
  );
};

interface RollingNumberProps {
  number: number;
}

const RollingNumber: React.FC<RollingNumberProps> = ({ number }) => {
  // Formatierung auf 2 Dezimalstellen
  const numberStr = number.toFixed(2);
  return (
    <View style={styles.rollingNumberContainer}>
      {numberStr.split('').map((char: string, index: number) => {
        // Falls das Zeichen eine Ziffer ist, animiert anzeigen, sonst statischer Text
        if (char >= '0' && char <= '9') {
          return <RollingDigit key={index} digit={parseInt(char, 10)} />;
        } else {
          return <Text key={index} style={styles.digitText}>{char}</Text>;
        }
      })}
    </View>
  );
};

interface TotalSumProps {
  produkte: ListItemType[];
}

const TotalSum: React.FC<TotalSumProps> = ({ produkte }) => {
  // Filtere alle null-Elemente heraus
  const validProdukte = produkte.filter((item) => item !== null) as ListItemType[];
  const gesamtSumme = validProdukte.reduce(
    (acc, item) =>
      acc + parseFloat(String(item.price).replace(',', '.')) * Number(item.quantity),
    0
  );

  return (
    <View style={styles.totalSumContainer}>
      {/* <Text style={styles.labelText}>Gesamtsumme: </Text> */}
      {/* Hier wird die rollende Zahl angezeigt */}
      <Text style={styles.labelText}><RollingNumber number={gesamtSumme} /> €</Text>
    </View>
  );
};

export default TotalSum;

const styles = StyleSheet.create({
  container: {},
  sumText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  totalSumContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 100,
  },
  rollingNumberContainer: {
    flexDirection: 'row',
  },
  digitText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 24,
  },
});