import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Pressable, Alert } from 'react-native';
import bg from './assets/bg.jpeg';
import React, { useState, useEffect } from 'react';
import Cell from './src/components/Cell';

const emptyMap = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const copyMap = (original) => {
  const copy = original.map((arr) => {
    return arr.slice();
  });
  return copy;
}
export default function App() {
  const [map, setMap] = useState(emptyMap);
  const [currentTurn, setCurrentTurn] = useState('x');
  // Game options: local, BOT EASY, BOT MEDIUM
  const [gameMode, setGameMode] = useState('BOT_MEDIUM');

  useEffect(() => {

    if (currentTurn == "o" && gameMode != "LOCAL") {
      botTurn();
    }
    // botTurn is trigered every time currentTurn changes but with if condition only 'o' 
  }, [currentTurn, gameMode]);


  // it will update map whenever map is changed 
  // it will actually update in next frame but we will not notice it 
  useEffect(() => {
    const winner = getWinner(map);
    if (winner) {
      gameWon(winner);
    }
    else {
      checkTieState();
    }
  }, [map]);

  const onPress = (rowIndex, colIndex) => {

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

  };

  const getWinner = (winningMap) => {
    // check rows
    for (let i = 0; i < 3; i++) {
      const isRowxWinning = winningMap[i].every(cell => cell == 'x');
      const isRowoWinning = winningMap[i].every(cell => cell == 'o');
      if (isRowxWinning) {
        return 'x';

      }
      if (isRowoWinning) {
        return 'o';

      }
    }

    // check cols
    for (let col = 0; col < 3; col++) {
      let isColxWinner = true;
      let isColoWinner = true;

      for (let row = 0; row < 3; row++) {
        // if any of row in col is not 'x' x did not win -> set isColxWinner to false
        if (winningMap[row][col] !== 'x') {
          isColxWinner = false;
        }
        // if any of row in col is not 'o' o did not win -> set isColoWinner to false

        if (winningMap[row][col] !== 'o') {
          isColoWinner = false;
        }
      }

      if (isColxWinner) {
        return 'x';

      }

      if (isColoWinner) {
        return 'o';
      }
    }

    // check diagonals
    let isDiagonalleftoWinning = true;
    let isDiagonalleftxWinning = true;
    let isDiagonalrightoWinning = true;
    let isDiagonalrightxWinning = true;
    for (let i = 0; i < 3; i++) {
      if (winningMap[i][i] != 'x') {
        isDiagonalleftxWinning = false;
      }
      if (winningMap[i][i] != 'o') {
        isDiagonalleftoWinning = false;
      }

      if (winningMap[i][2 - i] != 'x') {
        isDiagonalrightxWinning = false;
      }
      if (winningMap[i][2 - i] != 'o') {
        isDiagonalrightoWinning = false;
      }
    }


    if (isDiagonalleftoWinning || isDiagonalrightoWinning) {
      return 'o';
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

  const botTurn = () => {
    // collect all possible options
    const possiblePositions = [];
    map.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell == '') {
          possiblePositions.push({ row: rowIndex, col: colIndex });
        }
      });
    });


    let choosenOption;
    // Check if the opponent will win if it chooses one of the possible positons 
    if (gameMode == "BOT_MEDIUM") {


      // Attack
      possiblePositions.forEach((possiblePosition) => {
        const mapCopy = copyMap(map);
        mapCopy[possiblePosition.row][possiblePosition.col] = "o";
        const winner = getWinner(mapCopy);
        if (winner == 'o') {
          choosenOption = possiblePosition;
        }
      });
      // defend
      if (!choosenOption) {
        possiblePositions.forEach((possiblePosition) => {
          const mapCopy = copyMap(map);
          mapCopy[possiblePosition.row][possiblePosition.col] = "x";
          const winner = getWinner(mapCopy);
          if (winner == 'x') {
            choosenOption = possiblePosition;
          }
        });

      }
    }

    if (gameMode == "BOT_EASY") {
      if (!choosenOption) {
        possiblePositions.forEach((possiblePosition) => {
          const mapCopy = copyMap(map);
          mapCopy[possiblePosition.row][possiblePosition.col] = "x";
          const winner = getWinner(mapCopy);
          if (winner == 'x') {
            choosenOption = possiblePosition;
          }
        });

      }
    }

    // choose random 
    if (!choosenOption) {
      choosenOption = possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
    }

    // choose the best option

    if (choosenOption) {
      onPress(choosenOption.row, choosenOption.col);
    }

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
        <Text style={{
          fontSize: 24,
          color: "white",
          position: "absolute",
          top: 50,
        }}>Current Turn: {currentTurn.toUpperCase()}</Text>
        <View style={styles.map}>
          {map.map((row, rowIndex) => (
            <View key={`row - ${rowIndex}`} style={styles.row}>
              {row.map((cell, colIndex) => (
                <Cell
                  key={`row-${rowIndex}-col-${colIndex}`}
                  cell={cell}
                  // on press would not receive anything from cell but local method would send the rowIndex and colIndex 
                  // no point in sending row and col to cell 
                  onPress={() => onPress(rowIndex, colIndex)} />

              ))}

            </View>

          ))}
        </View>
        <View style={styles.buttons}>
          <Text onPress={() => setGameMode("LOCAL")} style={[
            styles.button,
            { backgroundColor: gameMode === "LOCAL" ? "#4F5686" : "#191F24" },
          ]}>Local</Text>
          <Text onPress={() => setGameMode("BOT_EASY")}
            style={[
              styles.button,
              {
                backgroundColor:
                  gameMode === "BOT_EASY" ? "#4F5686" : "#191F24",
              },
            ]}>Easy Bot</Text>
          <Text onPress={() => setGameMode("BOT_MEDIUM")}
            style={[
              styles.button,
              {
                backgroundColor:
                  gameMode === "BOT_MEDIUM" ? "#4F5686" : "#191F24",
              },
            ]}>Medium Bot</Text>
        </View>


      </ImageBackground >
      <StatusBar style="auto" />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252D33',
    alignItems: "center",
    justifyContent: "center",
  },

  map: {

    width: "80%",
    aspectRatio: 1,

  },

  row: {
    flex: 1,
    flexDirection: "row",

  },



  bg: {
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
  },

  buttons: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
  },

  button: {
    color: "white",
    margin: 10,
    fontSize: 20,
    backgroundColor: "#1991F24",
    padding: 10,
    paddingHorizontal: 15,

  },


});
