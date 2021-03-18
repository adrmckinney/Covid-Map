module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        covid: "url('./images/viktor-forgacs-FcDqdJUM6B4-unsplash.jpg')"
      })
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
