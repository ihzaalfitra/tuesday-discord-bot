function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}
module.exports = {
	name: 'greeting',
	description: 'Greets user who greets tue',
	execute(message, args, wit, trimmedMessage) {
		const seed = getRandomInt(10);
		if(trimmedMessage === 'hi' || trimmedMessage === 'hello' || trimmedMessage === 'hey' || trimmedMessage === 'halo' || trimmedMessage === 'hei') {
			if(seed == 0) {
				message.channel.send(trimmedMessage + ' <@' + message.author.id + '>, how do you do?');
			}
			else if(seed == 1) {
				message.channel.send(trimmedMessage + ' <@' + message.author.id + '>, good to see you.');
			}
			else if(seed == 2) {
				message.channel.send(trimmedMessage + ' <@' + message.author.id + '>, how\'s it going?');
			}
			else if(seed == 3) {
				message.channel.send(trimmedMessage + ' <@' + message.author.id + '>, how are you?');
			}
			else if(seed == 4) {
				message.channel.send(trimmedMessage + ' <@' + message.author.id + '>, what\'s up?');
			}
			else if(seed == 5) {
				message.channel.send(trimmedMessage + ' <@' + message.author.id + '>, how\'s everything?');
			}
			else if(seed == 6) {
				message.channel.send(trimmedMessage + ' <@' + message.author.id + '>, how\'s your day?');
			}
			else if(seed == 7) {
				message.channel.send(trimmedMessage + ' <@' + message.author.id + '>, how\'s your day going?');
			}
			else if(seed == 8) {
				message.channel.send(trimmedMessage + ' <@' + message.author.id + '>, nice to see you.');
			}
			else if(seed == 9) {
				message.channel.send(trimmedMessage + ' <@' + message.author.id + '>, how have you been?');
			}
			else{
				message.channel.send(message);
			}
		}
		else {
			const greeting = 'Yo';
			if(seed == 0) {
				message.channel.send(greeting + ' <@' + message.author.id + '>, how do you do?');
			}
			else if(seed == 1) {
				message.channel.send(greeting + ' <@' + message.author.id + '>, good to see you.');
			}
			else if(seed == 2) {
				message.channel.send(greeting + ' <@' + message.author.id + '>, how\'s it going?');
			}
			else if(seed == 3) {
				message.channel.send(greeting + ' <@' + message.author.id + '>, how are you?');
			}
			else if(seed == 4) {
				message.channel.send(greeting + ' <@' + message.author.id + '>, what\'s up?');
			}
			else if(seed == 5) {
				message.channel.send(greeting + ' <@' + message.author.id + '>, how\'s everything?');
			}
			else if(seed == 6) {
				message.channel.send(greeting + ' <@' + message.author.id + '>, how\'s your day?');
			}
			else if(seed == 7) {
				message.channel.send(greeting + ' <@' + message.author.id + '>, how\'s your day going?');
			}
			else if(seed == 8) {
				message.channel.send(greeting + ' <@' + message.author.id + '>, nice to see you.');
			}
			else if(seed == 9) {
				message.channel.send(greeting + ' <@' + message.author.id + '>, how have you been?');
			}
		}
	},
};
