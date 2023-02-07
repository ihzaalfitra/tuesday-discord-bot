module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown : 1,
	execute(message, args, wit) {
		message.channel.send('Pong.');
	},
};
