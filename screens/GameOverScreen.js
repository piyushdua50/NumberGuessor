import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';


const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Card style={styles.inputContainer}>
                <TitleText style={styles.titleContainer}>The Game is Over!</TitleText>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/images/success.png')}
                        // source={{ uri: 'https://www.worldatlas.com/r/w963-h562-c963x562/upload/66/14/d8/kangchenjunga.jpg' }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.summary}>
                    {/* <BodyText>
                        Your phone needed <Text style={styles.highlight}>{props.rounds}</Text> rounds to guess the Number <Text style={styles.highlight}>{props.number}</Text>
                    </BodyText> */}
                    <BodyText style={styles.title}>Number of Rounds: {props.rounds}</BodyText>
                    <BodyText style={styles.title}>Number was: {props.number}</BodyText>
                </View>
                {/* <View style={styles.button}>
                    <Button title="START NEW GAME" color={Colors.secondary} onPress={() => props.onRestart()} />
                </View> */}
                <MainButton onPress={() => props.onRestart()}>
                    NEW GAME
                </MainButton>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center'
    },
    titleContainer: {
        fontSize: 20,
        marginVertical: 10,
        color: 'green',
    },
    title: {
        fontSize: 14,
        marginVertical: 10,
        color: 'black'
    },
    summary: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    // button: {
    //     width: '70%',
    //     paddingVertical: 20
    // },
    imageContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: 'blue',
        overflow: 'hidden',
        marginVertical: 20
    },
    image: {
        width: '100%',
        height: '100%'
    },
    highlight: {
        color: Colors.primary
    }
});

export default GameOverScreen;