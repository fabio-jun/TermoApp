import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, Alert } from 'react-native';
import { colors } from "./constants";
import Keyboard from './Keyboard';

const tries = 6;

const Termo = ({ words }) => {
  const [word, setWord] = useState('');
  const [letters, setLetters] = useState([]);
  const [rows, setRows] = useState(new Array(tries).fill(new Array(5).fill("")));
  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);
  const [gameState, setGameState] = useState("playing");
  const [greenLetters, setGreenLetters] = useState([]);
  const [yellowLetters, setYellowLetters] = useState([]);
  const [greyLetters, setGreyLetters] = useState([]);

  useEffect(() => {
    resetGame();
  }, [words]);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  const resetGame = () => {
    const randomWord = getRandomWord();
    setWord(randomWord);
    setLetters(randomWord.split(''));
    setRows(new Array(tries).fill(new Array(randomWord.length).fill("")));
    setCurRow(0);
    setCurCol(0);
    setGameState("playing");
    setGreenLetters([]);
    setYellowLetters([]);
    setGreyLetters([]);
  };

  useEffect(() => {
    if (curRow > 0) {
      updateKeyboardColors(curRow - 1);
      checkGameState();
    }
  }, [curRow]);

  const updateKeyboardColors = (rowIndex) => {
    const row = rows[rowIndex];
    const newGreen = [...greenLetters];
    const newYellow = [...yellowLetters];
    const newGrey = [...greyLetters];

    row.forEach((letter, i) => {
      if (!letter) return;
      if (letter === letters[i]) {
        if (!newGreen.includes(letter)) newGreen.push(letter);
      } else if (letters.includes(letter)) {
        if (!newYellow.includes(letter) && !newGreen.includes(letter)) newYellow.push(letter);
      } else {
        if (!newGrey.includes(letter)) newGrey.push(letter);
      }
    });

    setGreenLetters(newGreen);
    setYellowLetters(newYellow);
    setGreyLetters(newGrey);
  };

  const checkGameState = () => {
    if (checkIfWon()) {
      Alert.alert("Vitória!", "Parabéns, você acertou a palavra!", [{ text: "OK", onPress: resetGame }]);
      setGameState("won");
    } else if (checkIfLost()) {
      Alert.alert("Game Over!", `A palavra correta era: ${word}`, [{ text: "OK", onPress: resetGame }]);
      setGameState("lost");
    }
  };

  const checkIfWon = () => {
    const row = rows[curRow - 1];
    return row.every((letter, i) => letter === letters[i]);
  };

  const checkIfLost = () => {
    return curRow === rows.length;
  };

  const onKeyPressed = (key) => {
    if (gameState !== "playing") return;

    const updatedRows = copyArray(rows);

    if (key === 'Backspace') {
      if (curCol > 0) {
        updatedRows[curRow][curCol - 1] = "";
        setRows(updatedRows);
        setCurCol(curCol - 1);
      }
      return;
    }

    if (key === 'Enter') {
      if (curCol === rows[0].length) {
        setCurRow(curRow + 1);
        setCurCol(0);
      }
      return;
    }

    if (key.length === 1) {
      if (curCol < rows[0].length) {
        updatedRows[curRow][curCol] = key.toUpperCase();
        setRows(updatedRows);
        setCurCol(curCol + 1);
      }
    }
  };

  const isCellActive = (row, col) => {
    return row === curRow && col === curCol;
  };

  const getCellColor = (letter, row, col) => {
    if (row >= curRow) {
      return colors.black;
    }

    if (letter === letters[col]) {
      return colors.primary;
    }
    if (letters.includes(letter)) {
      return colors.secondary;
    }
    return colors.darkgrey;
  };

  const copyArray = (arr) => {
    return [...arr.map((rows) => [...rows])];
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.map}>
        {rows.map((row, i) => (
          <View key={`row-${i}`} style={styles.row}>
            {row.map((letter, j) => (
              <View
                key={`cell-${i}-${j}`}
                style={[
                  styles.cell,
                  {
                    borderColor: isCellActive(i, j)
                      ? colors.lightgrey
                      : colors.darkgrey,
                    backgroundColor: getCellColor(letter, i, j),
                  },
                ]}
              >
                <Text style={styles.cellText}>{letter.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <Keyboard
        onKeyPressed={onKeyPressed}
        greenLetters={greenLetters}
        yellowLetters={yellowLetters}
        greyLetters={greyLetters}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  map: {
    alignSelf: 'stretch',
    height: 100,
  },
  row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: "center",
  },
  cell: {
    borderWidth: 3,
    borderColor: colors.darkgrey,
    flex: 1,
    maxWidth: 70,
    aspectRatio: 1,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    color: colors.lightgrey,
    fontWeight: 'bold',
    fontSize: 30,
  },
});

export default Termo;
