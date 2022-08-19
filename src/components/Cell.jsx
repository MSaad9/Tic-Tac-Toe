import { View, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Cross from './Cross';

const Cell = (props) => {
    const { cell, onPress } = props;
    return (
        <Pressable
            onPress={() => onPress()} style={styles.cell}>
            {cell == 'o' && <View style={styles.circle} />}
            {cell == 'x' && <Cross />}
        </Pressable>
    )
}
const styles = StyleSheet.create({
    circle: {

        flex: 1,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderWidth: 5,
        borderColor: 'white',

    },
    cell: {
        width: 100,
        height: 100,
        flex: 1,


    },
});

export default Cell