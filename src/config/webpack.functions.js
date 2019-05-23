const webpack = require('webpack')

export default {
  mode: "development",
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false })
  ],
}