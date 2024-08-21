import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movie } from "./MovieViewModel";

export class FavoritesViewModel {
    private static FAVORITES_KEY = 'FAVORITES_KEY';

    // Get the list of favorites movies from asyncStorage which is the same as userDefaults in Swift
    async getFavoritesMovies(): Promise<Movie[]> {
        try {
            const favorites = await AsyncStorage.getItem(FavoritesViewModel.FAVORITES_KEY);
            return favorites ? JSON.parse(favorites) : [];
        } catch (error) {
            console.log('Error getting favorite movies', error);
            return [];
        }
    }

    // Add a movie to the list of favorites
    async addFavoriteMovie(movie: Movie): Promise<void> {
        try {
            const favorites = await this.getFavoritesMovies();
            favorites.push(movie);
            await AsyncStorage.setItem(FavoritesViewModel.FAVORITES_KEY, JSON.stringify(favorites));
        } catch (error) {
            console.log('Error saving movie to favorites', error);
        }
    }

    // Remove a movie from the list of favorties
    async removeFavoriteMovie(movieId: number): Promise<void> {
        try {
            let favorites = await this.getFavoritesMovies();
            favorites = favorites.filter((m) => m.id != movieId);
            await AsyncStorage.setItem(FavoritesViewModel.FAVORITES_KEY, JSON.stringify(favorites));
        } catch (error) {
            console.log('Error removing favorite movie', error);
        }
    }

    // Check if a movie is in the list
    async isFavorite(movieId: number): Promise<boolean> {
        const favorites = await this.getFavoritesMovies();
        return favorites.some((m) => m.id === movieId);
    }
}