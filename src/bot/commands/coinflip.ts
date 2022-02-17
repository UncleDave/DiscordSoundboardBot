import { Message } from 'discord.js';
import constants from '../constants';
import Command from './command';
import { pickRandom } from '../utils'

let replyVar = ''
const headMsg = [
  'Heads. You\'re in WINNERS QUEUE BABYYYYYYY',
  'Heads. You is am good video gamer, buddy.',
  'Heads. Is that him?']
const tailMsg = [
  'Tails. ONONONONONONONONO',
  'Tails. Good news, Liam. You don\'t even have to queue up now!',
  'Tails. Aw nuts.',
  'Tails. IT\'S A DISASTER!',
  'Tails. Hold on, I\'m pulling up directions to the bridge on Google maps.',
]

export class CoinCommand extends Command {
  constructor() {
    super('coinflip', `${ constants.messagePrefix } coinflip`, 'Flip a coin to leave an important decision to chance!');
  }
  

  execute(message: Message): Promise<any> {
    let flip = Math.random()
    if (flip < 0.5) {
      replyVar = `${pickRandom(headMsg)}`
    } else {
      replyVar = `${pickRandom(tailMsg)}`
    }
    
    return message.reply(replyVar);
  }
}

export default new CoinCommand();