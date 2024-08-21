import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Movie } from '../viewModels/MovieViewModel'
import { FavoritesViewModel } from '../viewModels/FavoritesViewModel';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const FavoriteScreen = () => {
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const favoritesViewModel = new FavoritesViewModel();
    const navigation = useNavigation();
    const isFocused = useIsFocused()

    const fetchFavorites = async () => {
        const favoriteMovies = await favoritesViewModel.getFavoritesMovies()
        setFavorites(favoriteMovies);
    };

    useEffect(() => {
        if(isFocused) {
            console.log('Favorite screen is focused');
            fetchFavorites();
        }

    },[isFocused]);


    const renderFavoriteItem = ({item}: {item: Movie}) => (
        <TouchableOpacity onPress={() => navigation.navigate('Detail', { movie: item })} >
            <View style = {styles.container}>
                <Image
                    source={ {uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }} 
                    style={styles.poster}
                />
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
                    <Text style={styles.releaseDate}>{item.release_date}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Your Favorite Movies</Text>
        <FlatList
            data={favorites}
            renderItem={renderFavoriteItem}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<Text style={styles.emptyText}>No favorites added yet</Text>}
        />
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },

    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },

    movieItem: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3
    },

    poster: {
        width: 80,
        height: 120,
        borderRadius: 8
    },

    info: {
        marginLeft: 10,
        justifyContent: 'center',
        flex: 1
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    releaseDate: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5
    },

    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: 'gray',
    }
})

export default FavoriteScreen