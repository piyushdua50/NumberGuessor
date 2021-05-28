import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

const NumberContainer = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: Colors.secondary,
        padding: 10,
        borderRadius: 10,
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: Colors.secondary,
        fontSize: 22
    }
});

export default NumberContainer;