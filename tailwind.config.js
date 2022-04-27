module.exports = {
  content: ['projects/**/*.{html,ts}'],
  important: 'body.tailwind-enhance-specificity', // we use prefix `.theme-light` and `.theme-dark` to style components, so we need to make sure that the specificity is increased to override component styles
  theme: {
    extend: {},
  },
  plugins: [],
};
