import { Collection, Message, Client, CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

declare module 'discord.js' {
	interface Client {
		commands: Collection<unknown, Command>;
	}
}
