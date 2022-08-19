import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Pressable, Alert } from 'react-native';
import bg from './assets/bg.jpeg';
import React, { useState } from 'react';

const emptyMap = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
export default function App() {
  const [map, setMap] = useState(emptyMap);

  const [currentTurn, setCurrentTurn] = useState('x');

  const onPress = (rowIndex, colIndex) => {
    console.warn("Hello", rowIndex, colIndex);
    if (map[rowIndex][colIndex] != "") {
      Alert.alert("Position already occupied");
      return;
    }

    setMap((existingMap) => {
      const updatedMap = [...existingMap];
      updatedMap[rowIndex][colIndex] = currentTurn;
      return updatedMap;
    });

    setCurrentTurn(currentTurn == 'x' ? "o" : "x");

    const winner = getWinner();
    if (winner) {
      gameWon(winner);
    }
    else {
      checkTieState();
    }

  };

  const getWinner = () => {
    // check rows
    for (let i = 0; i < 3; i++) {
      const isRowxWinning = map[i].every(cell => cell == 'x');
      const isRowoWinning = map[i].every(cell => cell == 'o');
      if (isRowxWinning) {
        return 'x';

      }
      if (isRowoWinning) {
        return 'O';

      }
    }

    // check cols
    for (let col = 0; col < 3; col++) {
      let isColxWinner = true;
      let isColoWinner = true;

      for (let row = 0; row < 3; row++) {
        // if any of row in col is not 'x' x did not win -> set isColxWinner to false
        if (map[row][col] !== 'x') {
          isColxWinner = false;
        }
        // if any of row in col is not 'o' o did not win -> set isColoWinner to false

        if (map[row][col] !== 'o') {
          isColoWinner = false;
        }
      }

      if (isColxWinner) {
        return 'x';

      }

      if (isColoWinner) {
        return 'O';
      }
    }

    // check diagonals
    let isDiagonalleftoWinning = true;
    let isDiagonalleftxWinning = true;
    let isDiagonalrightoWinning = true;
    let isDiagonalrightxWinning = true;
    for (let i = 0; i < 3; i++) {
      if (map[i][i] != 'x') {
        isDiagonalleftxWinning = false;
      }
      if (map[i][i] != 'o') {
        isDiagonalleftoWinning = false;
      }

      if (map[i][2 - i] != 'x') {
        isDiagonalrightxWinning = false;
      }
      if (map[i][2 - i] != 'o') {
        isDiagonalrightoWinning = false;
      }
    }


    if (isDiagonalleftoWinning || isDiagonalrightoWinning) {
      return 'O';
    }
    if (isDiagonalleftxWinning || isDiagonalrightxWinning) {
      return 'x';
    }

  };

  const checkTieState = () => {
    if (!map.some((row) => row.some((cell) => cell == ""))) {
      Alert.alert(`It's a `, `Tie`, [
        {
          text: "Restart",
          onPress: resetGame,
        },
      ]);
    }

  };

  const gameWon = (player) => {
    Alert.alert(`Yayy`, `Player ${player} won`, [
      {
        text: "Restart",
        onPress: resetGame,
      },
    ]);

  };

  const resetGame = () => {
    setMap([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setCurrentTurn('x');
  }
  return (
    <View style={styles.container}>
      {/* add background image */}
      {/* keep everything in image background, so all elements considered as children */}
      {/* resideMode contain will make sure it fits the screen */}
      <ImageBackground source={bg} style={styles.bg} resizeMode="contain">
        <Text>Current Turn: {currentTurn}</Text>
        <View style={styles.map}>
          {map.map((row, rowIndex) => (
            <View key={`row - ${rowIndex}`} style={styles.row}>
              {row.map((cell, colIndex) => (
                <Pressable
                  key={`row - ${rowIndex} - col - ${colIndex}`}
                  onPress={() => onPress(rowIndex, colIndex)} style={styles.cell}>
                  {cell == 'o' && <View style={styles.circle} />}
                  {cell == 'x' && (
                    <View style={styles.cross}>
                      <View style={styles.crossLine} />
                      <View style={[styles.crossLine, styles.crossLineReversed]} />
                    </View>
                  )}
                </Pressable>
              ))}

            </View>

          ))}

        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252D33',

  },

  map: {

    width: "80%",
    aspectRatio: 1,

  },

  row: {
    flex: 1,
    flexDirection: "row",

  },

  cell: {
    width: 100,
    height: 100,
    flex: 1,


  },

  bg: {
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  circle: {

    flex: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 5,
    borderColor: 'white',

  },

  cross: {
    flex: 1,
  },
  crossLine: {
    position: 'absolute',
    left: "48%",
    width: 10,
    height: "100%",
    backgroundColor: 'white',
    borderRadius: 5,
    transform: [
      {
        "rotate": "45deg",
      },
    ],
  },
  crossLineReversed: {
    transform: [
      {
        "rotate": "-45deg",
      },
    ],
  }
});
