const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const browserConfig = {
  entry: './src/client/index.js',
  mode: 'development',
  output: {
    path: __dirname,
    filename: './build/bundle.js'
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react-app']
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          {
            loader: 'postcss-loader',
            options: { plugins: [autoprefixer()]}
          }
        ]
      },
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'file-loader',
        options: {
          name: 'build/media/[name].[ext]',
          publicPath: url => url.replace(/build/, '')
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'build/css/[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false
    })
  ]
}
 
const serverConfig = {
  entry: './src/server/index.js',
  mode: 'development',
  target: 'node',
  output: {
    path: __dirname,
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'file-loader',
        options: {
          name: 'build/media/[name].[ext]',
          publicPath: url => url.replace(/build/, ''),
          emit: false
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              onlyLocals: true
            }
          }
        ]
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react-app']
        }
      },
    ]
  },
  externals: ['express']
}
module.exports = [browserConfig, serverConfig]