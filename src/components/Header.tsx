import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Header = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Popular Movies</Text>
        </View>
    )
}


// Styles
const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#282c34',
        alignItems: 'center', // Center the text horizontally
        paddingTop: 100,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    }
})

export default Header