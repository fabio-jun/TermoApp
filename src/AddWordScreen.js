import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from "./constants.js";
import Keyboard from './Keyboard';

const AddWordScreen = ({ navigation, handleAddWord }) => {
  const [newWord, setNewWord] = useState('');

  const onKeyPressed = (key) => {
    if (key === 'Backspace') {
      setNewWord(prev => prev.slice(0, -1));
    } else if (key === 'Enter') {
      if (newWord.length === 5) {
        handleAddWord(newWord);
        navigation.goBack();
      }
    } else if (key.length === 1 && newWord.length < 5) {
      setNewWord(prev => prev + key.toUpperCase());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{newWord || 'Digite uma palavra'}</Text>
      <Keyboard
        onKeyPressed={onKeyPressed}
        greenLetters={[]}
        yellowLetters={[]}
        greyLetters={[]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    backgroundColor: colors.background,
  },
  display: {
    color: colors.lightgrey,
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 6,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default AddWordScreen;
