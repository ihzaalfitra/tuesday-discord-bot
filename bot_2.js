// require the discord.js module
import Discord from 'discord.js';
// import fetch from "node-fetch";
// globalThis.fetch=fetch;
import { ChatGPTAPI } from 'chatgpt';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const {
	prefix,
  prefixComma,
  suffix,
  suffixQuestion,
  suffixExclamation,
  suffixDot,
	discordToken,
	gptToken
} = require("./config.json");
// create a new Discord client
const client = new Discord.Client({ disableMentions: "everyone" , intents:"intents"});
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const wordInString = (s, word) => new RegExp('\\b' + word + '\\b', 'i').test(s);

async function ChatGPT(message) {
  const api = new ChatGPTAPI({
    apiKey: gptToken
  });

  const res = await api.sendMessage(message);
	console.log(res.text);
  return res.text;
}


// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});
client.on('reconnecting', () => {
	console.log('Reconnecting!');
});
client.on('disconnect', () => {
	console.log('Disconnect!');
});
client.on('warn', (info) => console.log(info));
client.on('error', console.error);

// login to Discord with your app's token
client.login(discordToken);

client.on('message', async message => {

	if ((!message.content.startsWith(prefix) && !message.content.startsWith(prefixComma) && !message.content.endsWith(suffix) && !message.content.endsWith(suffixQuestion) && !message.content.endsWith(suffixExclamation) && !message.content.endsWith(suffixDot)) || message.author.bot) return;

	// message without prefix
	let command = null;
	if (message.content.startsWith(prefix) || message.content.startsWith(prefixComma)) {
		command = message.content.slice(prefix.length).trim();
	}
	else if(message.content.endsWith(suffix) || message.content.endsWith(suffixQuestion) || message.content.endsWith(suffixExclamation) || message.content.endsWith(suffixDot)) {
		command = message.content.slice(0, -(prefix.length)).trim();
	}
	else{
		console.log('failed--' + message.content);
		return;
	}
	// the rest of your code

	console.log("message content:"+command);
	const response = await ChatGPT(command);
	console.log("gpt response:"+response);
	message.channel.send(response);

	// const args = message.content.slice(prefix.length).trim().split(/ +/);
	// const command = args.shift().toLowerCase();
	// // the rest of your code
	//
	// if (command){
	// 	message.channel.send('Pong.');
	// }
});
// TODO:
/*
implementing music play
	music play includes :
		play
		stop
		skip
		loop/repeat
	wit intentions
		resolving null intent but existing entity

*/
