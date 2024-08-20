import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';


const Header = ({title, onPress}: {title: string; onPress: () => void }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style= {styles.iconContainer} onPress={onPress} >
            <AntDesign name="search1" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}


// Styles
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        justifyContent: 'space-between', // space between title and icon
        alignItems: 'center', // center items vertically
        padding: 20,
        backgroundColor:'#282c34',
        paddingTop: 64,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    iconContainer: {
        padding: 5, 
      },
})

export default Header