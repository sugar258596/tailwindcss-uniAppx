const remToPx = () => {
  return {
    postcssPlugin: 'rem-to-px',
    Declaration(decl) {
      if (decl.value.includes('rem')) {
        decl.value = decl.value.replace(/(-?\d*\.?\d+)rem/g, (_, value) => {
          const px = Number(value) * 16
          return `${Number.isInteger(px) ? px : Number(px.toFixed(4))}px`
        })
      }
    },
  }
}

remToPx.postcss = true

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    remToPx(),
  ],
}
