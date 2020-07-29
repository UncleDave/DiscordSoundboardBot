﻿import addsound from './addsound';
import Command from './command';
import disconnect from './disconnect';
import HelpCommand from './help';
import sound from './sound';
import sounds from './sounds';

const commands = [sound, sounds, addsound, disconnect];

export const helpCommand: Command = new HelpCommand(commands);

export default [
  ...commands,
  helpCommand
];
