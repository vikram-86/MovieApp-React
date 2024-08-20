import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import React from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import { Movie } from '../viewModels/MovieViewModel';


// Define the types for the route parameters
// This hook is used to access the route parameters passed to this screen. In our case, we pass the selected movie object from the previous screen (either Home or Search).
type MovieDetailScreenRouteProp = RouteProp<{ params: { movie: Movie } }, 'params'>;
const MovieDetailScreen = () => {
    const route = useRoute<MovieDetailScreenRouteProp>(); // Get the passed movie object from the route
    const movie = route.params.movie;
  
    return (
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.poster}
        />
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.releaseDate}>Release Date: {movie.release_date}</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </ScrollView>
    );
  };


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    poster: {
        width: '100%',
        height: 300,
        marginBottom: 20,
        borderRadius: 10,
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
})

export default MovieDetailScreen