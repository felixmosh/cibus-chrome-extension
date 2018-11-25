const webpack = require('webpack'),
  path = require('path'),
  fileSystem = require('fs'),
  env = require('./utils/env'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  WriteFilePlugin = require('write-file-webpack-plugin'),
  ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// load the secrets
const alias = {};
const secretsPath = path.join(__dirname, 'secrets.' + env.NODE_ENV + '.js');

const fileExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'eot',
  'otf',
  'svg',
  'ttf',
  'woff',
  'woff2'
];

if (fileSystem.existsSync(secretsPath)) {
  alias['secrets'] = secretsPath;
}

const options = {
  entry: {
    popup: path.join(__dirname, 'src', 'scripts', 'popup.entry.tsx'),
    options: path.join(__dirname, 'src', 'scripts', 'options.js'),
    background: path.join(__dirname, 'src', 'scripts', 'background.js')
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'scripts/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true,
          compilerOptions: {
            module: 'es2015'
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]-[hash:base64:5]'
            }
          },
          'sass-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'img/'
        },
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: alias,
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    ...(env.NODE_ENV === 'development'
      ? [
          new ForkTsCheckerWebpackPlugin({
            tslint: true
          })
        ]
      : []),
    // clean the build folder
    new CleanWebpackPlugin(['build']),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/manifest.json',
        transform: function(content, path) {
          // generates the manifest file using the package.json information
          return Buffer.from(
            JSON.stringify({
              description: process.env.npm_package_description,
              version: process.env.npm_package_version,
              ...JSON.parse(content.toString())
            })
          );
        }
      },
      {
        from: 'src/img/',
        to: 'img/'
      }
    ]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'popup.html'),
      filename: 'popup.html',
      chunks: ['popup']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'options.html'),
      filename: 'options.html',
      chunks: ['options']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'background.html'),
      filename: 'background.html',
      chunks: ['background']
    }),
    new WriteFilePlugin()
  ]
};

if (env.NODE_ENV === 'development') {
  options.devtool = 'sourcemap';
}

module.exports = options;
