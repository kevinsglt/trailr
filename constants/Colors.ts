/**
 * TRAILR Design System - Colors
 * Dark theme with violet accent
 */

export const Colors = {
  // Background
  background: "#050505",
  backgroundElevated: "#0a0a0a",

  // Glass effect
  glass: "rgba(255, 255, 255, 0.06)",
  glassBorder: "rgba(255, 255, 255, 0.08)",
  glassDark: "rgba(5, 5, 5, 0.85)",

  // Accent - Violet
  violet: "#7c3aed",
  violet400: "#a78bfa",
  violet500: "#8b5cf6",
  violet600: "#7c3aed",
  violet700: "#6d28d9",

  // Text
  textPrimary: "#ffffff",
  textSecondary: "rgba(255, 255, 255, 0.7)",
  textMuted: "rgba(255, 255, 255, 0.4)",

  // Border
  border: "rgba(255, 255, 255, 0.1)",
  borderFocus: "#7c3aed",

  // Status
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",

  // Actions
  like: "#ef4444",
  watchlist: "#7c3aed",

  // Tab bar
  tabIconDefault: "rgba(255, 255, 255, 0.5)",
  tabIconSelected: "#7c3aed",
} as const;

// For backwards compatibility with the template
export default {
  light: {
    text: Colors.textPrimary,
    background: Colors.background,
    tint: Colors.violet,
    tabIconDefault: Colors.tabIconDefault,
    tabIconSelected: Colors.tabIconSelected,
  },
  dark: {
    text: Colors.textPrimary,
    background: Colors.background,
    tint: Colors.violet,
    tabIconDefault: Colors.tabIconDefault,
    tabIconSelected: Colors.tabIconSelected,
  },
};
