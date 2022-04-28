module.exports = {
  content: ['projects/**/*.{html,ts}'],
  important: 'html > body.tailwind-enhance-specificity', // enhance specificity so that component styles can be overridden
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
};
