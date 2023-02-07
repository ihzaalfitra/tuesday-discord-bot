module.exports = {
	name: 'compliment',
	description: 'compliment people',
	execute(message, args, wit) {
		console.log('complimenting...');
		const https = require('https');
		const url = 'https://complimentr.com/api ';

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
							message.channel.send('Hey master, ' + json.compliment);
						}
						else{
							message.channel.send('No. It\'s not my master');
						}
					}
					else{
						if(message.author.id == 431432159233048576) {
							message.channel.send('Hey master, ' + json.compliment);
						}
						else{
							message.channel.send('No. He\'s not my master');
						}
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
