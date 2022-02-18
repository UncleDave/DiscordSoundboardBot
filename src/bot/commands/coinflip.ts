import { ColorResolvable, Message } from 'discord.js';
import constants from '../constants';
import Command from './command';
import { pickRandom } from '../utils';

/*
interface DescriptionReply {description: string}
interface ImageReply {image: {url: string}}
type CoinflipReply = DescriptionReply | ImageReply
*/

const headMsg = [
  { description: 'You\'re in WINNERS QUEUE BABYYYYYYY' },
  { description: 'You is am good video gamer, buddy.' },
  { description: 'Is that him?' },
  { description: 'IT\'S HUGE' },
  { image: { url: 'https://i.imgur.com/M9sJim1.png' } },
  { image: { url: 'https://i.imgur.com/jb268vM.gif' } }
];

const tailMsg = [
  { description: 'ONONONONONONONONO' },
  { description: 'Good news, Liam. You don\'t even have to queue up now!' },
  { description: 'Aw nuts.' },
  { description: 'IT\'S A DISASTER!' },
  { description: 'Hold on, I\'m pulling up directions to the bridge on Google maps.' },
  { image: { url: 'https://i2-prod.chroniclelive.co.uk/incoming/article16374454.ece/ALTERNATES/s810/0_Wearmouth-Bridge.jpg' } },
  { image: { url: 'https://cdn.discordapp.com/attachments/535780263217594368/944317744046825502/Immervad-Bro.png' } },
  { description: '"You have been autofilled to Jungle"' },
  { description: 'ff @15' }
];

export class CoinCommand extends Command {
  constructor() {
    super('coinflip', `${ constants.messagePrefix } coinflip`, 'Flip a coin to leave an important decision to chance!');
  }

  execute(message: Message): Promise<any> {
    let flip = Math.random();
    let textVar;
    let titleVar;
    let colorVar: ColorResolvable;
    if (flip < 0.5) {
      textVar = pickRandom(headMsg);
      titleVar = 'Heads!';
      colorVar = '#72ff6e';
    } else {
      textVar = pickRandom(tailMsg);
      titleVar = 'Tails.';
      colorVar = '#ff4242';
    }

    return message.reply({
      embeds: [{ title: titleVar, ...textVar, color: colorVar }]
    });
  }
}

export default new CoinCommand();