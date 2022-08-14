import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import bg from './assets/bg.jpeg';
import React from 'react';

export default function App() {
  return (
    <View style={styles.container}>
      {/* add background image */}
      {/* keep everything in image background, so all elements considered as children */}
      {/* resideMode contain will make sure it fits the screen */}
      <ImageBackground source={bg} style={styles.bg} resizeMode="contain">
        <View style={styles.map}>
          {/* creates a circle */}
          <View style={styles.circle}>
            {/* to make a donut shape */}

          </View>
          {/* create a cross */}
          <View>
            <View style={styles.crossLine}></View>
            <View style={[styles.crossLine, styles.crossLineReversed]}></View>
          </View>
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
    borderWidth: 1,
    borderColor: 'white',
    width: "80%",
    aspectRatio: 1,

  },

  bg: {
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  circle: {
    position: 'absolute',
    width: 60,
    height: 60,
    left: 1 * 130,
    top: 1 * 130,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 8,
    borderColor: 'white',

  },

  innerCircle: {
    width: 50,
    height: 50,
    backgroundColor: '#252D33',
    borderRadius: 50,
  },
  crossLine: {
    position: 'absolute',
    width: 10,
    height: 60,
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
