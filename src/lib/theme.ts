// DevSecAI Brand Theme
export const theme = {
  colors: {
    // Primary colors
    primary: {
      dark: '#11151C',
      DEFAULT: '#1a1f2e',
      light: '#252b3d',
    },
    // Accent colors
    accent: {
      teal: '#3EBBB7',
      lime: '#41DC7A',
      cyan: '#00D4FF',
    },
    // Status colors
    status: {
      success: '#41DC7A',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3EBBB7',
    },
    // Text colors
    text: {
      primary: '#FFFFFF',
      secondary: '#94A3B8',
      muted: '#64748B',
    },
    // Background colors
    background: {
      primary: '#11151C',
      secondary: '#1a1f2e',
      card: '#1e2433',
      hover: '#252b3d',
    },
    // Border colors
    border: {
      DEFAULT: '#2d3548',
      light: '#3d4558',
    },
  },
  gradients: {
    primary: 'linear-gradient(135deg, #3EBBB7 0%, #41DC7A 100%)',
    dark: 'linear-gradient(180deg, #11151C 0%, #1a1f2e 100%)',
    card: 'linear-gradient(145deg, rgba(62, 187, 183, 0.1) 0%, rgba(65, 220, 122, 0.05) 100%)',
  },
} as const;

export type Theme = typeof theme;
