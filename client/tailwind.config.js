module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
      'custom-purple': '#4f46e5',
      },
      fontFamily: {
        'montserrat': ['Montserrat'],
        'josefin-sans' : ['Josefin Sans']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin')
  ],
}
