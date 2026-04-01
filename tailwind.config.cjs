/** @type {import('tailwindcss').Config} */
const path = require('path');

module.exports = {
  content: [
    path.resolve(__dirname, './App.uvue'),
    path.resolve(__dirname, './main.uts'),
    path.resolve(__dirname, './pages/**/*.{uvue,vue}'),
    path.resolve(__dirname, './components/**/*.{uvue,vue}')
  ],
  theme: {
    extend: {}
  },
  corePlugins: {
    preflight: false
  }
}
