import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from './constants';

const rows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
];

const Keyboard = ({ onKeyPressed, greenLetters, yellowLetters, greyLetters }) => {
  const getKeyColor = (key) => {
    if (key === 'ENTER' || key === '⌫') return colors.grey;
    if (greenLetters.includes(key)) return colors.primary;
    if (yellowLetters.includes(key)) return colors.secondary;
    if (greyLetters.includes(key)) return colors.darkgrey;
    return colors.grey;
  };

  return (
    <View style={styles.container}>
      {rows.map((row, i) => (
        <View key={`kb-row-${i}`} style={styles.row}>
          {row.map((key) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.key,
                (key === 'ENTER' || key === '⌫') && styles.wideKey,
                { backgroundColor: getKeyColor(key) },
              ]}
              onPress={() => {
                if (key === '⌫') onKeyPressed('Backspace');
                else if (key === 'ENTER') onKeyPressed('Enter');
                else onKeyPressed(key);
              }}
            >
              <Text style={[styles.keyText, (key === 'ENTER') && styles.smallKeyText]}>
                {key}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 4,
  },
  key: {
    paddingVertical: 12,
    paddingHorizontal: 6,
    margin: 2,
    borderRadius: 5,
    minWidth: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wideKey: {
    minWidth: 50,
    paddingHorizontal: 10,
  },
  keyText: {
    color: colors.lightgrey,
    fontWeight: 'bold',
    fontSize: 16,
  },
  smallKeyText: {
    fontSize: 11,
  },
});

export default Keyboard;
