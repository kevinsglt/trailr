/**
 * TMDB Movie Types
 */

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  adult: boolean;
  video: boolean;
  original_language: string;
}

export interface MovieDetails extends Movie {
  runtime: number | null;
  budget: number;
  revenue: number;
  status: string;
  tagline: string | null;
  genres: Genre[];
  production_companies: ProductionCompany[];
  credits?: Credits;
  videos?: Videos;
  "watch/providers"?: WatchProviders;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Videos {
  results: Video[];
}

export interface Video {
  id: string;
  key: string; // YouTube video ID
  name: string;
  site: string; // "YouTube"
  size: number;
  type: string; // "Trailer", "Teaser", etc.
  official: boolean;
  published_at: string;
  iso_639_1: string;
  iso_3166_1: string;
}

export interface WatchProviders {
  results: {
    FR?: CountryProviders;
    [key: string]: CountryProviders | undefined;
  };
}

export interface CountryProviders {
  link?: string;
  flatrate?: Provider[];
  rent?: Provider[];
  buy?: Provider[];
}

export interface Provider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
  display_priority: number;
}

// API Response types
export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// App-specific types
export interface TrailerMovie extends Movie {
  trailerKey: string | null;
  providers: Provider[];
}
