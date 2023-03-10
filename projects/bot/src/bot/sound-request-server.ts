import { WebSocketServer } from 'ws';
import { createServer, IncomingMessage } from 'http';
import axios from 'axios';
import logger from '../logger';
import Environment from '../environment';

type SoundRequestSubscriber = (userID: string, soundId: string) => void;
type SkipRequestSubscriber = (userID: string, skipAll: boolean) => void;

interface Action {
  type: 'play' | 'skip';
}

interface PlayAction extends Action {
  type: 'play';
  sound: string;
}

interface SkipAction extends Action {
  type: 'skip';
  skipAll: boolean;
}

interface SocketRequest extends IncomingMessage {
  userId: string;
}

export default class SoundRequestServer {
  constructor(port: number, private readonly environment: Environment) {
    this.createServer(port);
  }

  private soundSubscribers: SoundRequestSubscriber[] = [];
  private skipSubscribers: SkipRequestSubscriber[] = [];

  subscribeToSoundRequests(subscriber: SoundRequestSubscriber) {
    this.soundSubscribers.push(subscriber);
  }

  subscribeToSkipRequests(subscriber: SkipRequestSubscriber) {
    this.skipSubscribers.push(subscriber);
  }

  private createServer(port: number) {
    const wss = new WebSocketServer({ noServer: true });

    wss.on('connection', (ws, req: SocketRequest) => {
      ws.on('message', data => {
        const action: PlayAction | SkipAction = JSON.parse(data.toString());

        if (action.type === 'play')
          this.soundSubscribers.forEach(x => x(req.userId, action.sound));

        if (action.type === 'skip')
          this.skipSubscribers.forEach(x => x(req.userId, action.skipAll));
      });
    });

    const server = createServer((req, res) => res.writeHead(204).end());
    server.on('upgrade', async (req: SocketRequest, socket, head) => {
      const token = req.headers.cookie?.split('accesstoken=')[1].split(';')[0];

      if (!token) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
      }

      try {
        const userRes = await axios.get('https://discord.com/api/users/@me', { headers: { Authorization: `Bearer ${ token }`, 'Accept-encoding': 'application/json' } });
        req.userId = userRes.data.accesstoken;
        wss.handleUpgrade(req, socket, head, ws => {
          wss.emit('connection', ws, req);
        });
      } catch (error) {
        socket.destroy();
        logger.info(error);
      }
    });

    server.listen(port, () => {
      logger.info(`Sound request server listening on port ${ port }`);
    });
  }
}
