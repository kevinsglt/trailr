/**
 * Authentication Types
 */

import type { Session, User } from "@supabase/supabase-js";

export interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isGuest: boolean;
  hasCompletedOnboarding: boolean;
}

export interface AuthContextType extends AuthState {
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signInAsGuest: () => Promise<void>;
  signOut: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
}

export interface UserPreferences {
  platforms: string[];
  genres: string[];
  moodIntensity: number;
  moodPace: number;
  moodTension: number;
  moodComplexity: number;
  filterByPlatforms: boolean;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  platforms: [],
  genres: [],
  moodIntensity: 3,
  moodPace: 3,
  moodTension: 3,
  moodComplexity: 3,
  filterByPlatforms: false,
};
