const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
module.exports = {
	name: 'play',
	description: 'Play music',
	execute(message, args, wit, trimmedMessage) {
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) return message.reply('please join a voice channel first!');
		ytsr.do_warn_deprecate = false;
		let filter;
		let link = '';
		ytsr.getFilters('ga1ahad and scientific witchery', function(err, filters) {
			if(err) throw err;
			filter = filters.get('Type').find(o => o.name === 'Video');
			ytsr.getFilters(filter.ref, function(err, filters) {
				if(err) throw err;
				let options = {
					limit: 5,
					nextpageRef: filter.ref,
				};
				ytsr(null, options, function(err, searchResults) {
					if(err) throw err;
					link = searchResults.items[0].link;
				});
			});
		});
		console.log(link);
		voiceChannel.join().then(connection => {
			const stream = ytdl(link, { filter: 'audioonly' });
			const dispatcher = connection.play(stream);

			dispatcher.on('finish', () => voiceChannel.leave());
		});
	},
};
