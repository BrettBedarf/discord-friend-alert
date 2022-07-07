// Require the necessary discord.js classes
import { Client, Collection, Intents } from 'discord.js';
import * as url from 'node:url';
import * as fs from 'node:fs';
import * as dotenv from 'dotenv';

dotenv.config();
const token = process.env.DISC_TOKEN;
if (!token) {
	throw new Error('No discord token found');
}
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILD_PRESENCES] });

client.commands = new Collection();
const commandsPath = new URL('./commands/', import.meta.url);
const commandFiles = fs
	.readdirSync(commandsPath)
	.filter(file => file.endsWith('.js') || file.endsWith('.ts'));
for (const file of commandFiles) {
	const filePath = new URL(file, commandsPath);
	const { default: command } = await import(url.fileURLToPath(filePath));
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	let command;
	if (interaction.isCommand() || interaction.isContextMenu()) {
		command = client.commands.get(interaction.commandName);
	} else return;

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({
			content: 'There was an error while executing this command!',
			ephemeral: true,
		});
	}
});

client.on('presenceUpdate', async (oldPresence, newPresence) => {
	console.log('old:' + oldPresence, 'new: ' + newPresence.toJSON());
});

// Login to Discord with your client's token
client.login(token);
