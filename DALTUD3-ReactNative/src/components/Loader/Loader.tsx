/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';

function Loader(): JSX.Element {
    return (
        <View style={styles.loaderBg}>
            <ActivityIndicator size={50} color='#E57905' style={{paddingHorizontal: 10}} />
        </View>
    );
}

const styles = StyleSheet.create({
    loaderBg: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,

    },
    loaderView: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 5,
        width: 260,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 10,
    },
});

export default Loader;
