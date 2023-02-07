module.exports = {
	name: 'kick',
	description: 'Kick user',
	execute(message, args, wit) {
		const user = message.mentions.users.first();
		if(user) {
			const member = message.guild.member(user);
			// if (!message.member.hasPermission('KICK_MEMBERS') && !message.member.hasPermission('ADMINISTRATOR')) {
			// 	message.reply('Sorry, you don\'t have permission to do that.');
			// 	return;
			// }
			if(member) {
				member.kick()
					.then(() => {
						message.reply(`Done. ${user.tag} has been kicked`);
					})
					.catch(err => {
						message.reply('Can\'t kick ${user.tag} for some reason.');
						console.error(err);
					});
			}
			else {
				message.reply(`I think ${user.name} is not a member here.`);
			}
		}
		else {
			message.reply('Please mention or tag the masochist that wants to be kicked.');
		}
	},
};
