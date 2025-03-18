/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
          light: 'var(--color-primary-light)'
        },
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        card: 'var(--color-card-bg)',
        text: {
          DEFAULT: 'var(--color-text)',
          dark: 'var(--color-text-dark)'
        }
      },
      backgroundImage: {
        'gradient-industrial': 'linear-gradient(to right, var(--color-primary-dark), var(--color-primary))',
      },
      borderRadius: {
        'card': '0.75rem',
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'hover': '0 10px 15px rgba(0, 0, 0, 0.2)',
      }
    }
  },
  plugins: []
}
