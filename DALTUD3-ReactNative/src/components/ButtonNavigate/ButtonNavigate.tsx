/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconDefinition} from '@fortawesome/free-solid-svg-icons';

interface ButtonNavigateType {
    focused: boolean;
    iconName: IconDefinition;
    tabName: string;
}
export default function ButtonNavigate({focused, iconName, tabName}: ButtonNavigateType) {
    return (
        <View style={styles.container}>
            <FontAwesomeIcon icon={iconName} color={focused ? '#E57905' : 'gray'} size={25} />
            <Text
                style={[
                    styles.fontText,
                    {
                        color: focused ? '#E57905' : 'gray',
                    },
                ]}>
                {tabName}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    fontText: {
        fontWeight: 'normal',
    },
});
