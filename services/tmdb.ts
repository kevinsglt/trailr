/**
 * TMDB API Service
 * Documentation: https://developer.themoviedb.org/docs
 */

import type {
  Movie,
  MovieDetails,
  TMDBResponse,
  Video,
  Provider,
  TrailerMovie,
} from "@/types/movie";

const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

if (!TMDB_API_KEY) {
  throw new Error("Missing TMDB API key. Check your .env file.");
}

// Image URL helpers
export const getImageUrl = (
  path: string | null,
  size: "w200" | "w300" | "w500" | "w780" | "original" = "w500"
): string | null => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getPosterUrl = (path: string | null): string | null =>
  getImageUrl(path, "w500");

export const getBackdropUrl = (path: string | null): string | null =>
  getImageUrl(path, "w780");

// API helper
async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", TMDB_API_KEY!);
  url.searchParams.append("language", "fr-FR");

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get popular movies in France
 */
export async function getPopularMovies(page = 1): Promise<TMDBResponse<Movie>> {
  return fetchTMDB<TMDBResponse<Movie>>("/movie/popular", {
    region: "FR",
    page: page.toString(),
  });
}

/**
 * Discover movies by genre IDs
 */
export async function getMoviesByGenres(
  genreIds: number[],
  page = 1
): Promise<TMDBResponse<Movie>> {
  return fetchTMDB<TMDBResponse<Movie>>("/discover/movie", {
    with_genres: genreIds.join(","),
    region: "FR",
    sort_by: "popularity.desc",
    page: page.toString(),
  });
}

/**
 * Get full movie details with credits, videos, and watch providers
 */
export async function getMovieDetails(id: number): Promise<MovieDetails> {
  return fetchTMDB<MovieDetails>(`/movie/${id}`, {
    append_to_response: "credits,videos,watch/providers",
  });
}

/**
 * Get YouTube trailer key for a movie
 * Returns French trailer if available, falls back to English
 */
export async function getTrailerKey(movieId: number): Promise<string | null> {
  try {
    // First try French trailers
    const frVideos = await fetchTMDB<{ results: Video[] }>(`/movie/${movieId}/videos`);

    // Find official trailer in French
    let trailer = frVideos.results.find(
      (v) => v.site === "YouTube" && v.type === "Trailer" && v.official
    );

    // Fallback to any French trailer
    if (!trailer) {
      trailer = frVideos.results.find(
        (v) => v.site === "YouTube" && v.type === "Trailer"
      );
    }

    // Fallback to teaser
    if (!trailer) {
      trailer = frVideos.results.find(
        (v) => v.site === "YouTube" && v.type === "Teaser"
      );
    }

    if (trailer) return trailer.key;

    // Try English if no French trailer
    const enVideos = await fetchTMDB<{ results: Video[] }>(`/movie/${movieId}/videos`, {
      language: "en-US",
    });

    trailer = enVideos.results.find(
      (v) => v.site === "YouTube" && v.type === "Trailer" && v.official
    ) || enVideos.results.find(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    );

    return trailer?.key ?? null;
  } catch (error) {
    console.error(`Error fetching trailer for movie ${movieId}:`, error);
    return null;
  }
}

/**
 * Get streaming providers for France
 */
export async function getWatchProviders(movieId: number): Promise<Provider[]> {
  try {
    const data = await fetchTMDB<{ results: { FR?: { flatrate?: Provider[] } } }>(
      `/movie/${movieId}/watch/providers`
    );

    return data.results?.FR?.flatrate ?? [];
  } catch (error) {
    console.error(`Error fetching providers for movie ${movieId}:`, error);
    return [];
  }
}

/**
 * Get movies with trailers for the feed
 * Filters out movies without available trailers
 */
export async function getMoviesWithTrailers(
  page = 1,
  genreIds?: number[]
): Promise<TrailerMovie[]> {
  // Get movies
  const moviesResponse = genreIds?.length
    ? await getMoviesByGenres(genreIds, page)
    : await getPopularMovies(page);

  // Fetch trailers and providers in parallel
  const moviesWithData = await Promise.all(
    moviesResponse.results.slice(0, 10).map(async (movie) => {
      const [trailerKey, providers] = await Promise.all([
        getTrailerKey(movie.id),
        getWatchProviders(movie.id),
      ]);

      return {
        ...movie,
        trailerKey,
        providers,
      };
    })
  );

  // Filter out movies without trailers
  return moviesWithData.filter((movie) => movie.trailerKey !== null);
}

/**
 * Search movies by query
 */
export async function searchMovies(
  query: string,
  page = 1
): Promise<TMDBResponse<Movie>> {
  return fetchTMDB<TMDBResponse<Movie>>("/search/movie", {
    query,
    region: "FR",
    page: page.toString(),
  });
}
