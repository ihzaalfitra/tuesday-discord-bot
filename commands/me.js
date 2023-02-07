module.exports = {
	name: 'me',
	description: 'me!',
	cooldown : 1,
	execute(message, args, wit) {
		message.channel.send(`You're ${message.author.username}`);
	},
};
