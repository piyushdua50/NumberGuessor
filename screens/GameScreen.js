import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Button, Alert, ScrollView, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    let num = Math.random();
    // console.log("Min and Max is: ", min, max, exclude, num);
    const randomNo = Math.floor(num * (max - min)) + min;

    if (randomNo === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        console.log("Generated number is: ", randomNo);
        return randomNo;
    };
};

const GameScreen = (props) => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

    const { userChoice, onGameOver } = props;

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect(() => {
        // console.log("Inside Use Effect");
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        };
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = (direction) => {
        if (
            (direction === 'lower' && currentGuess < userChoice) ||
            (direction === 'greater' && currentGuess > userChoice)
        ) {
            // console.log("Inside If block---------------");
            Alert.alert(
                "Don\'t lie!",
                "You know it is wrong..........",
                [{ text: 'Sorry!', style: 'cancel' }]
            );
            return;
        };

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        };

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(currRounds => currRounds + 1);
        setPastGuesses(currGuess => [nextNumber.toString(), ...currGuess]);
    };

    const renderListItem = (listLength, itemData) => {
        return (
            <View style={styles.listItem}>
                <BodyText># Round {listLength - itemData.index}</BodyText>
                <BodyText>{itemData.item}</BodyText>
            </View>
        );
    };

    return (
        <View style={styles.screen}>
            <TitleText style={styles.title}>Opponent's Guess</TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" color="white" size={24} />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" color="white" size={24} />
                </MainButton>
            </Card>
            <View style={styles.list}>
                {/* <ScrollView>{pastGuesses.map((guess, index) => renderListItem(guess, (pastGuesses.length - index)))}</ScrollView> */}
                <FlatList
                    keyExtractor={(item) => item}
                    data={pastGuesses}
                    renderItem={(itemList) => renderListItem(pastGuesses.length, itemList)}
                // renderItem = {({item,index})=>console.log(item,index)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 300,
        maxWidth: '80%',
        marginTop: 20
    },
    title: {
        fontSize: 14,
    },
    list: {
        flex: 1,
        width: '70%',
        marginTop: 10
    },
    listItem: {
        borderColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        borderWidth: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default GameScreen;