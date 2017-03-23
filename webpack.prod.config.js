var path = require("path");
var webpack = require("webpack");
var TARGET = process.env.TARGET || null;

var config = {
  entry: {
    index: './src/react-trix.tsx',
  },
  output: {
    publicPath: 'dist/',
    filename: "react-trix.js",
    path: __dirname + "/dist",
    sourceMapFilename: "react-trix.sourcemap.js",
    library: 'react-trix',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loader: "ts-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      "React": "react",
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  externals: {
    "react": "React",
    "react-dom": "react-dom"
  },
};

if (TARGET === "minify") {
  config.output.filename = "react-trix.min.js";
  config.output.sourceMapFilename = "react-trix.sourcemap.min.js";
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: {
      except: ['React', 'Trix']
    }
  }));
}

module.exports = config;