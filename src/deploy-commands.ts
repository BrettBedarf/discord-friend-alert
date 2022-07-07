import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import * as fs from 'fs';
import { URL } from 'url';
import * as dotenv from 'dotenv';
dotenv.config();

const { DISC_TOKEN: token, DISC_CLIENT_ID: clientId } = process.env;
if (!token || !clientId) {
	throw new Error(
		`Missing env var(s): ${!token && 'DISC_TOKEN'} ${
			!clientId && 'DISC_CLIENT_ID'
		}`
	);
}

const commandsDir = new URL('./commands/', import.meta.url);
const commandFiles = fs
	.readdirSync(commandsDir)
	.filter(file => file.endsWith('.js') || file.endsWith('.ts'));

const commands = await Promise.all(
	commandFiles.map(async file => {
		// @ts-ignore
		const { default: cmd } = await import(new URL(file, commandsDir));
		return cmd.data.toJSON();
	})
);

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
