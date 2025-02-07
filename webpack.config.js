const path = require('path');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: {
      'interactive-components': './src/components/interactive/index.ts',
      'accessibility-features': './src/components/accessibility/index.ts',
      'common-components': './src/components/common/index.ts'
    },
    output: {
      path: path.resolve(__dirname, 'wp-content/themes/rachel-lee-theme/assets/js'),
      filename: '[name].bundle.js',
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(scss|css)$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProduction
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/scripts')
      }
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: 'vendors'
      }
    }
  };
}; 