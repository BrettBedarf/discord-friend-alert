import { ContextMenuCommandBuilder } from '@discordjs/builders';
import { UserContextMenuInteraction } from 'discord.js';
const friendAlertCtx = {
	data: new ContextMenuCommandBuilder()
		.setName('friend-alert-ctx')
		.setType(2),
	async execute(interaction: UserContextMenuInteraction) {
		console.log(interaction);
		interaction.reply('done');
	},
};
export default friendAlertCtx;
