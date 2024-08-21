import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MovieViewModel, Movie } from '../viewModels/MovieViewModel'
import { StyleSheet } from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';

// HomeScreen is our main screen and it fetches list of popular movies
const HomeScreen = () => {
    // State that hold the list of movies
    const [movies, setMovies] = useState<Movie[]>([]);
    const navigation = useNavigation();
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
    const renderMovieItem = ({ item }: { item: Movie }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Detail', { movie: item })}>
            <View style={styles.movieItem}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
                    style={styles.poster}
                />
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'>{item.title}</Text>
                    <Text style={styles.releaseDate}>{item.release_date}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );


    const renderFooter = () => {
        return <View style={styles.footer} />;
    };

    return (
        <View style={styles.container}>
            <Header title='Popular Movies' onPress={() => navigation.navigate('Search')} />
            <FlatList
                data={movies}
                renderItem={renderMovieItem}
                keyExtractor={(item) => item.id.toString()} // Unique key for each item "Identifiable in swift?"
                ListFooterComponent={renderFooter}
            />
        </View>
    );
};



// styles
const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    movieItem: {
        flexDirection: 'row', // Arrange the image and text side by side
        padding: 10,
    },

    poster: {
        width: 100,
        height: 150,
        borderRadius: 8,
    },

    info: {
        marginLeft: 10, // Add some space between poster and the text
        justifyContent: 'center', // Center the text vertically
        flex: 1, // Ensure the text container takes up remaining space
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        flexShrink: 1, // allows to shrink if needed
        lineHeight: 27
    },

    releaseDate: {
        fontSize: 16,
        color: "gray",
    },

    footer: {
        height: 32
    },

    icon: {
        marginRight: 15
    }
});


export default HomeScreen;