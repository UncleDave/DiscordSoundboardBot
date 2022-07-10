import * as applicationInsights from 'applicationinsights';
import express, { request } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import multer from 'multer';
import streamifier from 'streamifier';
import sanitize from 'sanitize-filename';
import webpack from 'webpack';
import { webPackConfig } from './webpack-config';
import { SoundsService, AddSoundOptions, errors as soundErrors } from 'botman-sounds';
import environment from './environment';
import { discordAuth, soundRequest, skipRequest } from './ui-client';

if (process.env.NODE_ENV === 'production') {
  applicationInsights.setup();
  applicationInsights.defaultClient.context.tags[applicationInsights.defaultClient.context.keys.cloudRole] = 'Web backend';
  applicationInsights.start();
}

const soundsService = new SoundsService(environment.soundsConnectionString, environment.soundsDirectory);

webpack(webPackConfig, (err?) => console.log('webpack errors?:', err));

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

app.post('/api/sound', async (req, res) => {
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

const validContentTypes = ['audio/wav', 'audio/mpeg', 'audio/webm', 'audio/ogg'];
const extensions = ['.wav', '.mp3', '.webm', '.ogg'];
app.post('/api/addsound', upload.single('sound-file'), async (req, res) => {
  console.log('Addsound request');
  if (!validContentTypes.includes(req.file.mimetype) || !req.body['custom-name']) {
    res.sendStatus(400);
    res.end();
    return;
  }
  const lowerCaseName = req.body['custom-name'].toLowerCase();
  const newSound: AddSoundOptions = {
    name: lowerCaseName,
    fileName: sanitize(lowerCaseName) + extensions[validContentTypes.indexOf(req.file.mimetype)],
    fileStream: streamifier.createReadStream(req.file.buffer),
  };
  try {
    await soundsService.addSound(newSound);
  } catch (error) {
    if (error.message === soundErrors.soundAlreadyExists) {
      console.log(error);
      res.sendStatus(409);
      res.end();
      return;
    }
    throw new Error(error);
  }
  res.sendStatus(204);
  res.end();
});

app.use(serveStatic);

app.listen(environment.port, () => {
  console.log(`ui-server listening on port ${ environment.port }`);
});

