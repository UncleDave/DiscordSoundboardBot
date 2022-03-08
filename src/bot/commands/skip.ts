import { CommandInteraction } from 'discord.js';
import BotContext from '../bot-context';
import Command from './command';

const skipCommandOption = 'count';
export class SkipCommand extends Command {
  constructor() {
    super('skip', 'Skip currently playing sound(s)');
    this.commandData.options = [{
      name: skipCommandOption,
      type: 'STRING',
      required: false,
      description: 'Enter amount to skip (including currently playing) or "all" to clear the queue entirely.',
    }];
  }

  execute(interaction: CommandInteraction, context: BotContext): Promise<any> {
    let reply;
    const skipOption = interaction.options.getString(skipCommandOption, false);
    if (context.botAudioPlayer.player.state.status === 'idle' && context.soundQueue.length === 0) { // If player is Idle
      // eslint-disable-next-line no-useless-escape
      reply = 'No sounds currently playing or in queue! Why not try "/sound limmy are you deaf" ? \:ear_with_hearing_aid: \:smile:';
    } else if (skipOption) { // If not Idle and option
      if (skipOption === 'all') {
        context.botAudioPlayer.player.stop();
        context.soundQueue.clear();
        reply = 'Skipped all sounds. Queue is now empty.';
      } else if (Number.isInteger(Number(skipOption))) {
        if (Number(skipOption) > context.soundQueue.length) reply = 'All sounds skipped (count option was >= number of current sounds.)';
        else reply = `Skipped ${ skipOption } sound(s).`;
        context.botAudioPlayer.player.stop();
        const int = Number(skipOption);
        context.soundQueue.splice(0, int - 1);
      } else {
        reply = 'Invalid value for count entered. Try an integer or "all" without quotes.';
      }
    } else { // If not Idle and no option
      context.botAudioPlayer.player.stop();
      reply = 'Current sound skipped.';
    }
    return interaction.reply({ content: reply, ephemeral: false });
  }
}
export default new SkipCommand();
