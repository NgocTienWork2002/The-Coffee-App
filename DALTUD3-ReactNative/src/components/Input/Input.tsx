import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';

import {StyleSheet, View, Text, TextInput, TextInputProps} from 'react-native';

type NewProps = {
    textTitle?: string;
    error: string | null;
};

type PropsType = TextInputProps & NewProps;

export default function Input({textTitle, error, ...props}: PropsType) {
    return (
        <View style={styles.groupInput}>
            <Text style={styles.titleInput}>{textTitle}</Text>
            <View style={styles.inputView}>
                <TextInput style={styles.textInput} {...props} />
            </View>
            <Text style={styles.textError}>{error}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    groupInput: {
        marginBottom: 10,
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: 'white',
    },
    titleInput: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    textError: {
        color: 'red',
        minHeight: 10,
    },
    inputView: {
        position: 'relative',
    },
    btnHidePassword: {
        position: 'absolute',
        right: 10,
        top: 15,
    },
});
