/**
 * Movie/TV Genres Configuration
 * TMDB Genre IDs
 */

export interface Genre {
  id: string;
  name: string;
  tmdbId: number;
  emoji: string;
}

export const GENRES: Genre[] = [
  { id: "action", name: "Action", tmdbId: 28, emoji: "💥" },
  { id: "comedy", name: "Comédie", tmdbId: 35, emoji: "😂" },
  { id: "drama", name: "Drame", tmdbId: 18, emoji: "🎭" },
  { id: "horror", name: "Horreur", tmdbId: 27, emoji: "😱" },
  { id: "thriller", name: "Thriller", tmdbId: 53, emoji: "🔪" },
  { id: "romance", name: "Romance", tmdbId: 10749, emoji: "💕" },
  { id: "scifi", name: "Sci-Fi", tmdbId: 878, emoji: "🚀" },
  { id: "fantasy", name: "Fantaisie", tmdbId: 14, emoji: "🧙" },
  { id: "animation", name: "Animation", tmdbId: 16, emoji: "🎨" },
  { id: "documentary", name: "Documentaire", tmdbId: 99, emoji: "📹" },
  { id: "history", name: "Historique", tmdbId: 36, emoji: "📜" },
  { id: "crime", name: "Policier", tmdbId: 80, emoji: "🔍" },
];

// TMDB Genre ID to our Genre mapping
export const TMDB_GENRE_MAP = GENRES.reduce(
  (acc, genre) => {
    acc[genre.tmdbId] = genre;
    return acc;
  },
  {} as Record<number, Genre>
);

// Get genre names from TMDB IDs
export function getGenreNames(tmdbIds: number[]): string[] {
  return tmdbIds
    .map((id) => TMDB_GENRE_MAP[id]?.name)
    .filter(Boolean) as string[];
}

// Get genre emojis from TMDB IDs
export function getGenreEmojis(tmdbIds: number[]): string[] {
  return tmdbIds
    .map((id) => TMDB_GENRE_MAP[id]?.emoji)
    .filter(Boolean) as string[];
}
