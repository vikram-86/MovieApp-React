import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Movie } from '../viewModels/MovieViewModel';
import { FavoritesViewModel } from '../viewModels/FavoritesViewModel';
import AntDesign from '@expo/vector-icons/AntDesign';
import { BlurView } from 'expo-blur';


// Define the types for the route parameters
// This hook is used to access the route parameters passed to this screen. In our case, we pass the selected movie object from the previous screen (either Home or Search).
type MovieDetailScreenRouteProp = RouteProp<{ params: { movie: Movie } }, 'params'>;

const MovieDetailScreen = () => {
    const route = useRoute<MovieDetailScreenRouteProp>(); // Get the passed movie object from the route
    const movie = route.params.movie;
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const favoritesViewModel = new FavoritesViewModel()
    const navigation = useNavigation();

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
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                {/* Back button in the top-left corner */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="arrowleft" size={32} color="white" />
                </TouchableOpacity>
                <BlurView intensity={50} style={styles.textContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{movie.title}</Text>
                        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
                            <AntDesign
                                name={isFavorite ? "heart" : "hearto"}
                                size={32}
                                color="red"
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.releaseDate}>Release Date: {movie.release_date}</Text>
                    <Text style={styles.overview}>{movie.overview}</Text>
                </BlurView>
            </ImageBackground>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-end', // Ensures the content is at the bottom
    },

    textContainer: {
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fallback color for the blur
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 28
    },

    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff', // White text color for better contrast
    },

    releaseDate: {
        fontSize: 16,
        color: 'lightgray',
        marginBottom: 10,
    },

    overview: {
        fontSize: 16,
        color: '#fff',
        lineHeight: 22,
        marginBottom: 48
    },

    favoriteButton: {
        marginRight: 10,
    },
    backButton: {
        position: 'absolute',
        top: 40, // Adjust according to your design, to position below the status bar
        left: 20, // Adjust to place it within the leading edge
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add a semi-transparent background for better visibility
        borderRadius: 20,
        padding: 5,
        zIndex: 1, // Ensure the back button is on top of other components
    },
})

export default MovieDetailScreen