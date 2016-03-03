var path          = require('path');
var webpack       = require('webpack');
var autoprefixer  = require('autoprefixer');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test:   /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      },
      {
        test: /\.jpg$/,
        loader: "url-loader?limit=10000&minetype=image/jpg"
      },
      {
        test: /\.png$/,
        loader: "url-loader?limit=10000&minetype=image/png"
      },
      {
        test: /\.svg$/,
        loader: "file-loader"
      }
    ]
  },
  postcss: function (webpack) {
    return [
      autoprefixer
    ];
  }
};
