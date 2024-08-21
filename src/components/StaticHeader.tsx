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
        width: '100%', 
        flexDirection: 'row',
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        backgroundColor: '#282c34',
        paddingTop: 64,
        paddingBottom: 20,
        paddingLeft: 18
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    }
})
export default StaticHeader