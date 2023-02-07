// require the discord.js module
const Discord = require('discord.js');
const { Wit, log } = require('node-wit');

const { prefix, discordToken, witToken } = require('./config.json');

const witClient = new Wit({
	accessToken: witToken,
	// optional
	logger: new log.Logger(log.DEBUG),
});

console.log(witClient.message('set temperature'));

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

// login to Discord with your app's token
client.login(discordToken);

client.on('message', message => {
	// client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	// the rest of your code

	if (command === 'ping') {
		message.channel.send('Pong.');
	}
	else if (command === 'beep') {
		message.channel.send('Boop.');
	}
	else if (command === 'server') {
		message.channel.send(`

Server name: ${message.guild.name}
Server owner: ${message.guild.owner}
Total members: ${message.guild.memberCount}

		`);
	}
	else if (command === 'me') {
		message.channel.send(`You're ${message.author.username}`);
	}

	else if (command === 'args-info') {
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		else if (args[0] === 'foo') {
			return message.channel.send('bar');
		}

		message.channel.send(`First argument: ${args[0]}`);
	}
	else if (command === 'kick') {
		// grab the "first" mentioned user from the message
		// this will return a `User` object, just like `message.author`
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}

		const taggedUser = message.mentions.users.first();

		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	}
	else if (command === 'avatar') {
		if (!message.mentions.users.size && args[0] == null) {
			return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: 'png', dynamic: true })}>`);
		}

		if (message.mentions.users.size == 1) {
			const taggedUser = message.mentions.users.first();

			return message.channel.send(`${taggedUser.username}'s avatar: <${message.author.displayAvatarURL({ format: 'png', dynamic: true })}>`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL({ format: 'png', dynamic: true })}>`;
		});

		// send the entire array of strings as a message
		// by default, discord.js will `.join()` the array with `\n`
		message.channel.send(avatarList);
	}


});

// TODO:
// https://discordjs.guide/creating-your-bot/commands-with-user-input.html#working-with-multiple-mentions
// get avatar from all users with specific roles
