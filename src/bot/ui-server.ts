import express from 'express';
import cors from 'cors';
import logger from '../logger';
import filesService from './files-service';
import environment from '../environment';

type ServerRequestSubscriber = () => void;

export default class SoundRequestServer {
  constructor(port: number) {
    this.port = port;
    this.createServer();
  }

  private port: number;
  private soundSubscribers: ServerRequestSubscriber[] = [];
  private skipSubscribers: ServerRequestSubscriber[] = [];
  currentRequest = {
    userID: '',
    soundChoice: '',
    skipAll: false,
  };

  onSoundRequest(subscriber: ServerRequestSubscriber) {
    this.soundSubscribers.push(subscriber);
  }

  onSkipRequest(subscriber: ServerRequestSubscriber) {
    this.skipSubscribers.push(subscriber);
  }

  private async getSounds() {
    const files = await filesService.files;
    const soundNames = files.map(x => x.name);
    return soundNames;
  }

  private async createServer() {
    const app = express();
    app.use(express.text());
    app.use(express.json());
    app.use(cors());

    app.use((req, res, next) => {
      if (req.headers.authorization === environment.apiKey) return next();
      return res.status(403);
    });

    app.get('/soundlist', async (req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      await this.getSounds()
        .then(data => {
          res.send(JSON.stringify(data));
          res.end();
        });
    });

    app.post('/soundrequest', (req, res) => {
      this.currentRequest.userID = req.body.userID;
      this.currentRequest.soundChoice = req.body.soundRequest;
      this.soundSubscribers.forEach(x => x());
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.writeHead(204);
      res.end();
    });

    app.post('/skip', (req, res) => {
      logger.info(`Server request to skip. Skip all: ${ req.body.skipAll }`);
      this.currentRequest.userID = req.body.userID;
      this.currentRequest.skipAll = req.body.skipAll;
      this.skipSubscribers.forEach(x => x());
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.writeHead(204);
      res.end();
    });

    app.listen(this.port, () => {
      logger.info(`sound request server listening on port ${ this.port }`);
    });
  }
}
