import { View, Text, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MovieViewModel, Movie } from '../viewModels/MovieViewModel'
import { StyleSheet } from 'react-native';
import Header from '../components/Header';
// HomeScreen is our main screen and it fetches list of popular movies
const HomeScreen = () => {
    // State that hold the list of movies
    const [movies, setMovies] = useState<Movie[]>([]);

    const viewModel = new MovieViewModel();

    //useEffect is similar to onAppear in SwiftUI
    useEffect(() => {
        // fetch movies on appear
        const fetchMovies = async () => {
            await viewModel.fetchPopularMovies();
            setMovies(viewModel.movies) // update the state with the fetched movies
        };

        fetchMovies();
    }, []); // The empty array means this effect rund only once after the first render


    // render each movie in the list
    const renderMovieItem = ({item}: {item:Movie}) => (
        <View style={styles.movieItem}>
            <Image
                source={{uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`}}
                style={styles.poster}
            />
            <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.releaseDate}>{item.release_date}</Text>
            </View>
        </View>
    );

    return (
        <FlatList
            data={movies}
            renderItem={renderMovieItem}
            keyExtractor={(item) => item.id.toString() } // Unique key for each item "Identifiable in swift?"
            ListHeaderComponent={<Header title='Popular Movies'/>}
        />
    );
};



// styles
const styles = StyleSheet.create({
    movieItem: {
        flexDirection: 'row', // Arrange the image and text side by side
        padding: 10, 
    },

    poster: {
        width: 100,
        height: 150,
    },

    info: {
        marginLeft: 10, // Add some space between poster and the text
        justifyContent: 'center', // Center the text vertically
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    releaseDate: {
        fontSize: 16,
        color: "gray",
    },
});


export default HomeScreen;