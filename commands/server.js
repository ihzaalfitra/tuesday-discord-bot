module.exports = {
	name: 'server',
	description: 'server information!',
	guildOnly : true,
	cooldown : 1,
	execute(message, args, wit) {
		message.channel.send(`Server name: ${message.guild.name}\nServer owner: ${message.guild.owner}\nTotal members: ${message.guild.memberCount} and voice channel what idk ${message.member.voice.channel}`);
	},
};
