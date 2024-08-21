import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const StaticHeader = ({title}: {title:string}) => {
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%', // Ensure the header takes the full width of the screen
        flexDirection: 'row',
        justifyContent: 'center', // Center the title horizontally
        alignItems: 'center', // Center items vertically
        backgroundColor: '#282c34',
        paddingTop: 64,
        paddingBottom: 20, // Adding some padding at the bottom for spacing
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    }
})
export default StaticHeader