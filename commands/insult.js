module.exports = {
	name: 'insult',
	description: 'insulting people',
	execute(message, args, wit) {
		console.log('insulting...');
		const https = require('https');
		const url = 'https://evilinsult.com/generate_insult.php?lang=en&type=json';

		https.get(url, (res) => {
			let body = '';

			res.on('data', (chunk) => {
				body += chunk;
			});

			res.on('end', () => {
				try {
					const json = JSON.parse(body);
					console.log(body);
					const user = message.mentions.users.first();
					if(user) {
						if(user.id == 431432159233048576) {
							message.channel.send('No. I won\'t insult my master');
						}
						else{
							message.channel.send(`Hey <@${user.id}>, ` + json.insult);
						}
					}
					else{
						message.channel.send(json.insult);
					}
				}
				catch (error) {
					console.error(error.message);
				}
			});

		}).on('error', (error) => {
			console.error(error.message);
		});
	},
};
