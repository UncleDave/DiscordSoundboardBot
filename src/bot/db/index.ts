import { connect } from 'mongoose';
import environment from '../../environment';

export * from './sound';

export default async function init() {
  await connect(environment.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
}
