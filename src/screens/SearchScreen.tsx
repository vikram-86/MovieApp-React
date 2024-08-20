import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import { Movie } from '../viewModels/MovieViewModel';
import { SearchViewModel } from '../viewModels/SearchViewModel';

const SearchScreen = () => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const searchViewModel = new SearchViewModel();
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null); // ref to store the timeout ID


    // Handle text input changes and perform the search with debouncing
    const handleSearch = (text: string) => {
        setQuery(text);
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current); // Clear the previous timeout if it's still running
        }

        typingTimeoutRef.current = setTimeout(async () => {
            if (text.length > 2) {
                await searchViewModel.searchMovies(text);
                setMovies(searchViewModel.movies);
            } else {
                setMovies([]);
            }
        }, 500); // wait for 500 ms before making the API call
    };

    const renderMovieItem = ({item}: {item: Movie}) => {
        <View style={styles.movieItem}>
            <Text style={styles.title}>{item.title}</Text>
        </View>
    };

    return (
        <View style={styles.container}>
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
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },

    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 10,
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