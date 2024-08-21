import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import { Movie } from '../viewModels/MovieViewModel';
import { FavoritesViewModel } from '../viewModels/FavoritesViewModel';
import AntDesign from '@expo/vector-icons/AntDesign';


// Define the types for the route parameters
// This hook is used to access the route parameters passed to this screen. In our case, we pass the selected movie object from the previous screen (either Home or Search).
type MovieDetailScreenRouteProp = RouteProp<{ params: { movie: Movie } }, 'params'>;

const MovieDetailScreen = () => {
    const route = useRoute<MovieDetailScreenRouteProp>(); // Get the passed movie object from the route
    const movie = route.params.movie;
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const favoritesViewModel = new FavoritesViewModel()

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            const favoriteStatus = await favoritesViewModel.isFavorite(movie.id);
            setIsFavorite(favoriteStatus);
        };
        checkFavoriteStatus();
    }, [movie.id]);

    const toggleFavorite = async () => {
        if (isFavorite) {
            await favoritesViewModel.removeFavoriteMovie(movie.id);
        } else {
            await favoritesViewModel.addFavoriteMovie(movie);
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                style={styles.poster}
            />
            <View style={styles.innerContainer} >
                <View style={styles.titleContainer}>
                   <Text style={styles.title}>{movie.title}</Text>
                   {/* Favorite button*/}
                <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton} >
                    <AntDesign
                        name={isFavorite ? "heart" : "hearto"}
                        size={32}
                        color="red"
                    />
                </TouchableOpacity>
                </View>
                <Text style={styles.releaseDate}>Release Date: {movie.release_date}</Text>
                <Text style={styles.overview}>{movie.overview}</Text>

            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    innerContainer: {
        padding: 10
    },

    poster: {
        width: '100%',
        height: 300,
        marginBottom: 20,
        borderRadius: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    releaseDate: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 10,
    },
    overview: {
        fontSize: 16,
        lineHeight: 22,
    },
    favoriteButton: {
        fontSize: 18,
        marginRight: 10
    },
})

export default MovieDetailScreen