import { Configuration } from 'webpack';
import path from 'path';

export const webPackConfig: Configuration = {
  entry: './scripts/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js'
  }
}