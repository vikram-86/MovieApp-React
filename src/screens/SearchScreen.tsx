import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native'
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
                <Text style={styles.title}>{item.title}</Text>
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
                    ListEmptyComponent={<Text> No results Found</Text>}
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
        paddingHorizontal: 32,
        borderRadius: 5,
        marginBottom: 24,
        marginTop: 24
    },

    movieItem: {
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },

    title: {
        fontSize: 18,
    }
});

export default SearchScreen