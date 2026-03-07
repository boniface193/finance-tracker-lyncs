module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      colors: {
        'bg-primary': '#0A0C10',     // Deep charcoal - main background
        'bg-secondary': '#14181F',    // Slightly lighter - cards/sections
        'bg-tertiary': '#1E242C',     // Even lighter - hover states, inputs
        'bg-elevated': '#2A313C',     // Modal, dropdowns, popovers
        'surface-1': '#1A1F26',       // Base surface
        'surface-2': '#252B34',       // Raised surface
        'surface-3': '#2F3640',       // Higher elevation
        'accent-1': '#4E9AF1',        // Soft blue - primary actions
        'accent-2': '#F1C40F',        // Vibrant yellow - highlights
        'accent-3': '#E74C3C',        // Bright red - errors
      },
    },
  },
  plugins: [],
}