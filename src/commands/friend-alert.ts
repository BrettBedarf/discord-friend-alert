import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

const friendAlert = {
	data: new SlashCommandBuilder()
		.setName('friend-alert')
		.setDescription('Sends a dm when a selected user comes online')
		.addUserOption(option =>
			option.setName('target').setDescription('Select a user')
		),
	async execute(interaction: CommandInteraction) {
		console.log(interaction);
		await interaction.reply('Pong!');
	},
};
export default friendAlert;
