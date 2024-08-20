
export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    overview: string;
}

export class MovieViewModel {
    movies: Movie[] = [];

    async fetchPopularMovies(): Promise<void> {
        const url = "https://api.themoviedb.org/3/movie/popular"
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzQ5Y2E0MWQxYTQ2NTkwZTM4MGRkMWNmZmZjMGZkOCIsIm5iZiI6MTcyNDE0OTQxMC43MzQwNDksInN1YiI6IjU1M2ZjZTA0YzNhMzY4NjQwMzAwMDI1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RzAtTA2lL7yVdUowjshRDTDHAvV51WQkuIxHydpYxPg'
            }
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('HTTP error! status ${error.status}');
            }

            const data = await response.json();
            this.movies = data.results;
        } catch (error) {
            console.error('Failed to fetch movies', error)
        }
    }
}