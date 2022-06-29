import * as applicationInsights from 'applicationinsights';
import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import multer from 'multer';
import { ReadOnlySoundsService } from 'botman-sounds';
import environment from './environment';
import { discordAuth, soundRequest, skipRequest } from './ui-client';

if (process.env.NODE_ENV === 'production') {
  applicationInsights.setup();
  applicationInsights.defaultClient.context.tags[applicationInsights.defaultClient.context.keys.cloudRole] = 'Web backend';
  applicationInsights.start();
}

const soundsService = new ReadOnlySoundsService(environment.soundsConnectionString);

const app = express();
const serveStatic = express.static('public', { extensions: ['html'] });

app.use(cookieParser());
app.use(cors({ origin: environment.UIServerURL }));
app.use(express.text());
const upload = multer();

app.get('/logout', (req, res, next) => {
  res.clearCookie('accesstoken');
  res.clearCookie('refreshtoken');
  next();
}, serveStatic);

app.use(discordAuth);

app.get('/api/user', async (req, res) => {
  try {
    const soundRes = await soundsService.getAllSounds();
    req.userData.soundList = soundRes.map(x => x.name);
    res.send(req.userData);
  } catch (error) {
    console.log(error);
  }
});

app.post('/api/soundrequest', async (req, res) => {
  console.log('Sound request.');
  await soundRequest(req.userData.userID, req.body);
  res.end();
});

app.get('/api/skip', async (req, res) => {
  console.log(`Skip request. All: ${ req.query.skipAll }`);
  if (req.query.skipAll === 'true') await skipRequest(true, req.userData.userID);
  else await skipRequest(false, req.userData.userID);
  res.end();
});

app.post('/api/addsound', upload.single('sound-file'), async (req, res) => {
  console.log(req.body);
  res.send(204);
});

app.use(serveStatic);

app.listen(environment.port, () => {
  console.log(`ui-server listening on port ${ environment.port }`);
});
