import webpack, { Configuration } from 'webpack';
import path from 'path';
import environment from './environment';

const webPackConfig: Configuration = {
  mode: environment.environment === 'development' ? 'development' : 'production',
  entry: './scripts/main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js',
  },
  watch: environment.environment === 'development',
  watchOptions: { poll: true },
};

export default function runWebPack() {
  const webpackHandler = (err?: Error) => console.log('webpack errors?:', err);
  webpack(webPackConfig, webpackHandler);
}
