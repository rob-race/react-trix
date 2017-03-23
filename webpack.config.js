var webpack = require("webpack");

module.exports = {
  entry: {
    index: "./example/demo.tsx"
  },
  output: {
    filename: "bundle.js",
    path: __dirname + "/example"
  },
  devtool: "source-map",
  plugins: [
    new webpack.ProvidePlugin({
      "React": "react",
    })
  ],
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loader: "ts-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  /*devServer: {
    contentBase: "./example",
    inline: true
  }*/
};