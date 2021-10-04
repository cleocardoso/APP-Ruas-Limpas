import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';


export function InputLogin({ errorText, description, placeholder, onPress, onChangeText, ...rest }) {
    return (
        <View style={styles.container}>
            <TextInput style={styles.inputText} placeholder={placeholder}
                {...rest}
                onChangeText={onChangeText}
            />

            {description && !errorText ? (
                <Text style={styles.description}>{description}</Text>
            ) : null}
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        width: '94%',
        height: 60,
        top: -50,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        marginRight: 12
    },
    inputText: {
        width: 310,
        height: 60,
        backgroundColor: '#F1F5F4',
        paddingLeft: 20,
        fontSize: 17,
        borderRadius: 10,
        padding: 4,
        borderWidth: 2,
        borderColor: '#2B887E',
        
    },

    description: {
        fontSize: 13,
        color: 'red',
        paddingTop: 38,

    },
    error: {
        fontSize: 15,
        color: 'red',
        paddingTop: 8,
        top: 32,
        left: -290
    },

});