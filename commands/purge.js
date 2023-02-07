module.exports = {
	name: 'purge',
	description: 'Purge channel message',
	execute(message, args, wit) {
		if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.hasPermission('ADMINISTRATOR') && message.author.id == 431432159233048576) {
			message.reply('Sorry, you don\'t have permission to do that. But you\'re my master so I\'ll do it anyway');
		}
		else if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.hasPermission('ADMINISTRATOR')) {
			message.reply('Sorry, you don\'t have permission to do that.');
			return;
		}
		const amount = wit.entities['wit$number:number'][0].value;
		message.channel.messages.fetch({ limit: parseInt(amount) })
			.then(messages => message.channel.bulkDelete(messages))
			.then(() => {
				message.channel.send('Done purging last ' + amount + ' messages');
			});
	},
};
