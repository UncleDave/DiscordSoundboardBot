import { Configuration } from 'webpack';
import path from 'path';
import environment from './src/environment';

const config: Configuration = {
  mode: environment.environment === 'development' ? 'development' : 'production',
  entry: './src/scripts/index.js',
  output: {
    path: path.resolve(__dirname, './src/public'),
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        }],
      },
    ],
  },
  watch: environment.environment === 'development',
  watchOptions: { poll: true },
};

export default config;
