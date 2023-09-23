import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'normal': '#a8a878',
        'normal-border': '#6d6d4e',
        'fire': '#f08030',
        'fire-border': '#9c531f',
        'water': '#6890f0',
        'water-border': '#445e9c',
        'grass': '#78c850',
        'grass-border': '#4e8234',
        'electric': '#f8d030',
        'electric-border': '#a1871f',
        'flying': '#a890f0',
        'flying-border': '#6d5e9c',
        'bug': '#a8b820',
        'bug-border': '#6d7815',
        'poison': '#a040a0',
        'poison-border': '#682a68',
        'ice': '#98d8d8',
        'ice-border': '#638d8d',
        'rock': '#b8a038',
        'rock-border': '#786824',
        'ground': '#e0c068',
        'ground-border': '#927d44',
        'fighting': '#c03028',
        'fighting-border': '#7d1f1a',
        'dragon': '#7038f8',
        'dragon-border': '#4924a1',
        'psychic': '#f85888',
        'psychic-border': '#a13959',
        'ghost': '#705898',
        'ghost-border': '#493963',
        'dark': '#705848',
        'dark-border': '#49392f',
        'steel': '#b8b8d0',
        'steel-border': '#787887',
        'fairy': '#ee99ac',
        'fairy-border': '#9b6470',
      },
    },
  },
  plugins: [],
} satisfies Config;
