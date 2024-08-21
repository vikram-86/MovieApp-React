import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { Movie } from '../viewModels/MovieViewModel';
import { SearchViewModel } from '../viewModels/SearchViewModel';
import { useNavigation } from '@react-navigation/native';
import StaticHeader from '../components/StaticHeader';

const SearchScreen = () => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const searchViewModel = new SearchViewModel();
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null); // ref to store the timeout ID
    const navigation = useNavigation()


    // Handle text input changes and perform the search with debouncing
    const handleSearch = (text: string) => {
        console.log('handling search')
        setQuery(text);
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current); // Clear the previous timeout if it's still running
        }

        typingTimeoutRef.current = setTimeout(async () => {
            if (text.length > 2) {
                console.log('Preparing search')
                await searchViewModel.searchMovies(text);
                setMovies(searchViewModel.movies);
                console.log('adding movies, result count:', movies)
            } else {
                setMovies([]);
            }
        }, 500); // wait for 500 ms before making the API call
    };

    const renderMovieItem = ({ item }: { item: Movie }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Detail', { movie: item })}>
            <View style={styles.movieItem}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
                    style={styles.poster}
                />
                <View style={styles.info}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.releaseDate}>{item.release_date}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StaticHeader title='Search' />
            <View style={styles.innerContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder='Search for movies'
                    value={query}
                    onChangeText={handleSearch}
                />
                <FlatList
                    data={movies}
                    renderItem={renderMovieItem}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={<Text style={styles.emptyText}>No results found</Text>}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    innerContainer: {
        padding: 10
    },

    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 24,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },

    movieItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },

    poster: {
        width: 100,
        height: 150,
        borderRadius: 10,
    },

    info: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    releaseDate: {
        fontSize: 14,
        color: 'gray',
    },

    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: 'gray',
    },
});

export default SearchScreen