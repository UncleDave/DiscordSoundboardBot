import webpack, { Configuration } from 'webpack';
import environment from './environment';
import path from 'path';

const webPackConfig: Configuration = {
  mode: environment.environment === 'development' ? 'development' : 'production',
  entry: './scripts/main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js',
  },
  watch: environment.environment === 'development' ? true : false,
  watchOptions: {
    poll: true,
  }
}

export default function runWebPack() {
  const webpackHandler = (err?: Error) => console.log('webpack errors?:', err);
  webpack(webPackConfig, webpackHandler)
};
