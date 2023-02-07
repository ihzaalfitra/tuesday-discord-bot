module.exports = {
	name: 'ban',
	description: 'Ban user',
	execute(message, args) {
		const user = message.mentions.users.first();
		if(user) {
			const member = message.guild.member(user);
			if(member) {
				member.ban()
					.then(() => {
						message.reply(`As you wish, ${user.tag} has been banned`);
					})
					.catch(err => {
						message.reply(`What the... i can't kick ${user.tag}`);
						console.error(err);
					});
			}
			else {
				message.reply(`Weird, i can't find ${user.name}`);
			}
		}
		else {
			message.reply('Idiot! You need to mention someone to be banned');
		}
	},
};
