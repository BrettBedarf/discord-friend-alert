import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

const ping = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction: CommandInteraction) {
		console.log(interaction);
		await interaction.reply('Pong!');
	},
};
export default ping;
