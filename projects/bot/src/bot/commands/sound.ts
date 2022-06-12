import { CommandInteraction, GuildMember, MessageActionRow, MessageButton, MessageComponentInteraction } from 'discord.js';
import logger from '../../logger';
import BotContext from '../bot-context';
import filesService from '../files-service';
import SoundFile from '../sound-file';
import { pickRandom } from '../utils';
import Command from './command';

const insults = ['dingus', 'doofus', 'dumb dumb'];
const soundOptionName = 'sound';

export class SoundCommand extends Command {
  constructor() {
    super('sound', 'Play a sound in your current voice channel.', { serverOnly: true });
    this.commandData.options = [{
      name: soundOptionName,
      type: 'STRING',
      required: true,
      description: 'The sound to play',
    }];
  }

  async execute(interaction: CommandInteraction, context: BotContext): Promise<any> {
    if (!(interaction.member instanceof GuildMember)) {
      logger.error('%s: Member wasn\'t real :(', interaction.id);
      return interaction.reply({
        content: 'Something went wrong :(.',
        ephemeral: true,
      });
    }

    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
      logger.info('%s: User was not in a voice channel', interaction.id);
      return interaction.reply({
        content: 'You must be in a voice channel to use this command.',
        ephemeral: true,
      });
    }

    const soundName = interaction.options.getString(soundOptionName, true);

    if (!soundName) {
      logger.error('%s: No <soundname> argument was specified', interaction.id);
      return interaction.reply({
        content: 'You didn\'t tell me what to play!',
        ephemeral: true,
      });
    }

    const soundFile = await this.getSoundFile(soundName, interaction);

    if (!soundFile)
      return interaction.reply({
        content: `Couldn't find sound "${ soundName }".`,
        ephemeral: true,
      });

    context.soundQueue.add({ sound: soundFile, channel: voiceChannel });
    logger.info('%s: Sound "%s" added to queue, length: %s', interaction.id, soundName, context.soundQueue.length);

    const successMessage = {
      content: `Your sound has been added to the queue at position #${ context.soundQueue.length }.`,
      ephemeral: true,
    };

    if (interaction.replied) return interaction.followUp(successMessage);
    return interaction.reply(successMessage);
  }

  private async getSoundFile(soundName: string, interaction: CommandInteraction): Promise<SoundFile | null> {
    const availableFiles = await filesService.files;
    const soundFile = availableFiles.find(x => x.name === soundName);

    if (soundFile)
      return soundFile;

    logger.info('%s: No "%s" sound was found', interaction.id, soundName);

    const partialMatches = availableFiles.filter(x => x.name.startsWith(soundName));

    if (!partialMatches.length)
      return null;

    if (partialMatches.length === 1)
      return partialMatches[0];

    logger.info('%s: Found %s partial matches for "%s"', interaction.id, partialMatches.length, soundName);
    return this.getUserSoundChoice(soundName, interaction, partialMatches);
  }

  private async getUserSoundChoice(searchTerm: string, interaction: CommandInteraction, files: SoundFile[]): Promise<SoundFile> {
    await interaction.reply({
      content: `Found multiple sounds that start with "${ searchTerm }", please choose one:`,
      ephemeral: true,
      components: this.createInteractionButtons(files, interaction.id),
    });

    const filter = (i: MessageComponentInteraction) => i.customId.includes(interaction.id);

    try {
      const collectedButton = await interaction.channel!.awaitMessageComponent({ filter, componentType: 'BUTTON', time: 30000 });
      const chosenFileIndex = Number(collectedButton.customId.replace(interaction.id, ''));
      interaction.editReply({ content: `You picked: ${ files[chosenFileIndex].name }.`, components: [] });

      return files[chosenFileIndex];
    } catch (err) {
      logger.info('%s: User failed to make a selection within the time limit', interaction.id);
      await interaction.editReply({
        content: `No selection was made in time, try again ${ pickRandom(insults) }.`,
        components: [],
      });
    }
    return Promise.reject(new Error('Timed out waiting for sound choice'));
  }

  private createInteractionButtons(buttonLabels: SoundFile[], interactionId: string) {
    const buttons: MessageButton[] = buttonLabels.map((b, index) => {
      const btn = new MessageButton()
        .setCustomId(interactionId + index)
        .setLabel(b.name)
        .setStyle(1);
      return btn;
    });
    const components: MessageActionRow[] = [];
    while (buttons.length > 0) {
      const row = new MessageActionRow()
        .addComponents(buttons.splice(0, 5));
      components.push(row);
    }
    return components;
  }
}

export default new SoundCommand();
