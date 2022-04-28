module.exports = {
  content: ['projects/**/*.{html,ts}'],
  important: '#tailwind-root', // enhance specificity so that component styles can be overridden
  darkMode: 'class',
  theme: {
    extend: {
      // Angular Material theme colors synced with the scss file
      // @debug map.get($theme, 'colors', 'primary');
      colors: {
        ['l-primary']: {
          ['default']: '#009688',
          ['lighter']: '#b2dfdb',
          ['darker']: '#00796b',
          ['text']: '#009688',
        },
        ['d-primary']: {
          ['default']: '#80cbc4',
          ['lighter']: '#b2dfdb',
          ['darker']: '#00796b',
          ['text']: '#80cbc4',
        },
        // @debug map.get($theme, 'colors', 'accent');
        ['l-accent']: {
          ['default']: '#ffc400',
          ['lighter']: '#ffecb3',
          ['darker']: '#ffa000',
          ['text']: '#ffc400',
        },
        ['d-accent']: {
          ['default']: '#ffc400',
          ['lighter']: '#ffecb3',
          ['darker']: '#ffa000',
          ['text']: '#ffc400',
        },
        // @debug map.get($theme, 'colors', 'warn');
        ['l-warn']: {
          ['default']: '#f44336',
          ['lighter']: '#ffcdd2',
          ['darker']: '#d32f2f',
          ['text']: '#f44336',
        },
        ['d-warn']: {
          ['default']: '#ffc400',
          ['lighter']: '#ffecb3',
          ['darker']: '#ffa000',
          ['text']: '#ffc400',
        },
        // @debug map.get($theme, 'colors', 'foreground');
        ['l-base']: 'black',
        ['l-text']: 'rgba(0, 0, 0, 0.87)',
        ['l-secondary-text']: 'rgba(0, 0, 0, 0.54)',
        ['l-hint-text']: 'rgba(0, 0, 0, 0.38)',
        ['d-base']: 'white',
        ['d-text']: 'white',
        ['d-secondary-text']: 'rgba(255, 255, 255, 0.7)',
        ['d-hint-text']: 'rgba(255, 255, 255, 0.5)',
        ['d-disabled']: 'rgba(255, 255, 255, 0.5)',
        // @debug map.get($theme, 'colors', 'background');
        ['l-background']: '#fafafa',
        ['l-hover']: 'rgba(0, 0, 0, 0.04)',
        ['d-background']: '#121212',
        ['d-hover']: 'rgba(255, 255, 255, 0.04)',
      },
    },
  },
  plugins: [],
};
