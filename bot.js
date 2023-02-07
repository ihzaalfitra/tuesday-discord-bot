const fs = require('fs');
// require the discord.js module
const Discord = require('discord.js');
const { Wit, log } = require('node-wit');
const say = require('say');
const {
	prefix,
	suffix,
	suffixQuestion,
	suffixExclamation,
	suffixDot,
	discordToken,
	witToken } = require('./config.json');

// create a new Discord client
const client = new Discord.Client({ disableMentions: "everyone" });
client.commands = new Discord.Collection();
client.queue = new Map();
const cooldowns = new Discord.Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

const witClient = new Wit({
	accessToken: witToken,
	// optional
	logger: new log.Logger(log.DEBUG),
});

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});
client.on('reconnecting', () => {
	console.log('Reconnecting!');
});
client.on('disconnect', () => {
	console.log('Disconnect!');
});
client.on('warn', (info) => console.log(info));
client.on('error', console.error);

// login to Discord with your app's token
client.login(discordToken);

client.on('message', (message) => {
	// client.on('message', message => {
	message.content = message.content.toLowerCase();
	if (message.member.voice.channel != null && message.author.id == 431432159233048576 && ((!message.content.startsWith(prefix) && !message.content.endsWith(suffix) && !message.content.endsWith(suffixQuestion) && !message.content.endsWith(suffixExclamation) && !message.content.endsWith(suffixDot)) || message.author.bot)) {
		console.log('speaking');
		tts(message.member.voice.channel, message.content);
		return;
	}
	else if ((!message.content.startsWith(prefix) && !message.content.endsWith(suffix) && !message.content.endsWith(suffixQuestion) && !message.content.endsWith(suffixExclamation) && !message.content.endsWith(suffixDot)) || message.author.bot) {
		console.log('command');
		return;
	}
	else{
		console.log('invalid');
		null;
	}


	// message without prefix
	let trimmedMessage = null;
	let args = null;
	if (message.content.startsWith(prefix)) {
		trimmedMessage = message.content.slice(prefix.length).trim();
		args = message.content.slice(prefix.length).trim().split(/ +/);
		console.log('message : ' + trimmedMessage);
	}
	else if(message.content.endsWith(suffix) || message.content.endsWith(suffixQuestion) || message.content.endsWith(suffixExclamation) || message.content.endsWith(suffixDot)) {
		trimmedMessage = message.content.slice(0, -(prefix.length)).trim();
		args = message.content.slice(0, -(prefix.length)).trim().split(/ +/);
		console.log('suffix--' + trimmedMessage);
	}
	else{
		console.log('failed--' + message.content);
		return;
	}
	// args if needed
	// messaging witClient
	witClient.message(trimmedMessage, {})
		.then((wit) => {
			const intents = wit.intents[0];
			console.log('Intent: ' + intents.name);
			if(intents.confidence < 0.8) {
				return message.reply('I\'m sorry, I\'m not confident I understand what you just said. Please be more specific or tell my master <@431432159233048576>');
			}
			// checking whether intents exist or not. exit if not found
			if (!client.commands.has(intents.name)) return;

			// intent = command
			const command = client.commands.get(intents.name);
			// checking whether command is for guild only or not
			if (command.guildOnly && message.channel.type === 'dm') {
				return message.reply('I can\'t execute that command inside DMs!');
			}

			if (!cooldowns.has(command.name)) {
				cooldowns.set(command.name, new Discord.Collection());
			}

			const now = Date.now();
			const timestamps = cooldowns.get(command.name);
			const cooldownAmount = (command.cooldown || 3) * 1000;

			if (timestamps.has(message.author.id)) {
				const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
				if (now < expirationTime) {
					const timeLeft = (expirationTime - now) / 1000;
					return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
				}
			}
			else{
				timestamps.set(message.author.id, now);
				setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
			}


			try {
				// executing intents
				command.execute(message, args, wit, trimmedMessage);
			}
			catch (error) {
				console.error(error);
				message.reply('there was an error trying to execute that command!');
			}
		})
		.catch(console.error);

});

function tts(voiceChannel, text) {
	if (!fs.existsSync('./temp')) {
		fs.mkdirSync('./temp');
	}
	const timestamp = new Date().getTime();
	const soundPath = `./temp/${timestamp}.wav`;
	say.export(text, 'Microsoft Zira Desktop', 1, soundPath, (err) => {
		if (err) {
			console.error(err);
			return;
		}
		else{
			voiceChannel.join().then((connection) => {
				connection.play(soundPath).on('end', () => {
					connection.disconnect();
					fs.unlinkSync(soundPath);
				}).on('error', (err) => {
					console.error(err);
					connection.disconnect();
					fs.unlinkSync(soundPath);
				});
			}).catch((err) => {
				console.error(err);
			});
		}
	});
}
// TODO:
/*
implementing music play
	music play includes :
		play
		stop
		skip
		loop/repeat
	wit intentions
		resolving null intent but existing entity

*/
