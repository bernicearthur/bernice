/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        accent: "var(--accent)",
        'accent-hover': "var(--accent-hover)",
        border: "var(--border)",
      },
      backgroundColor: {
        main: "var(--background)",
        'secondary': "var(--background-secondary)",
        'card-bg': "var(--card-background)",
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--text-primary)',
            a: {
              color: 'var(--accent)',
              '&:hover': {
                color: 'var(--accent-hover)',
              },
            },
            h1: {
              color: 'var(--text-primary)',
            },
            h2: {
              color: 'var(--text-primary)',
            },
            h3: {
              color: 'var(--text-primary)',
            },
            h4: {
              color: 'var(--text-primary)',
            },
            strong: {
              color: 'var(--text-primary)',
            },
            code: {
              color: 'var(--text-primary)',
            },
            blockquote: {
              color: 'var(--text-secondary)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
