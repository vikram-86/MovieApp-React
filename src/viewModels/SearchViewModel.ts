import { Movie } from "./MovieViewModel"; // Since we already have a movie struct


export class SearchViewModel {
    movies: Movie[] = [];

    // perform search for a movie with a query
    async searchMovies(query: string): Promise<void> {
        if (query.length > 2) {
            console.log('searching')
            const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzQ5Y2E0MWQxYTQ2NTkwZTM4MGRkMWNmZmZjMGZkOCIsIm5iZiI6MTcyNDE0OTQxMC43MzQwNDksInN1YiI6IjU1M2ZjZTA0YzNhMzY4NjQwMzAwMDI1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RzAtTA2lL7yVdUowjshRDTDHAvV51WQkuIxHydpYxPg'
                },
            };

            try {
                const response = await fetch(url, options);
                const data = await response.json();
                this.movies = data.results;
            } catch (error) {
                console.log('Error fetching search results:', error);
                this.movies = [];
            }
        } else {
            this.movies = [];
        }
    }
}