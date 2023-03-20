// require the discord.js module
import Discord from 'discord.js';
// import fetch from "node-fetch";
// globalThis.fetch=fetch;
import { ChatGPTAPI } from 'chatgpt';
import { createRequire } from "module";
import sendAPIReq from './generate.js';
const require = createRequire(import.meta.url);
const {
	prefix,
  	prefixComma,
  	suffix,
  	suffixQuestion,
  	suffixExclamation,
  	suffixDot,
	discordToken
} = require("./config.json");

// const discordToken = process.env.DISCORD_TOKEN
// create a new Discord client
const client = new Discord.Client({ disableMentions: "everyone" , intents:"intents"});
// const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// const wordInString = (s, word) => new RegExp('\\b' + word + '\\b', 'i').test(s);

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

	if (
		(
			!message.content.startsWith(prefix) &&
			!message.content.startsWith(prefixComma) &&
			!message.content.endsWith(suffix) &&
			!message.content.endsWith(suffixQuestion) &&
			!message.content.endsWith(suffixExclamation) &&
			!message.content.endsWith(suffixDot)
		) ||
		message.author.bot
	) return;

	let promptInput = null;
	if (
		message.content.startsWith(prefix) ||
		message.content.startsWith(prefixComma)
	){
		promptInput = message.content.slice(prefix.length).trim();
	}
	else if(
		message.content.endsWith(suffix) ||
		message.content.endsWith(suffixQuestion) ||
		message.content.endsWith(suffixExclamation) ||
		message.content.endsWith(suffixDot)
	){
		promptInput = message.content.slice(0, -(prefix.length)).trim();
		// promptInput = message.content;
	}else{
		console.log('failed--' + message.content);
		return;
	}

	console.log("message content:"+promptInput);
	const promptOutput = await sendAPIReq(promptInput);
	// console.log(promptOutput);
	message.channel.send(promptOutput);

	// try{
	// 	const response = await fetch("api/generate.js", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({ promptInput: promptInput }),
	// 	});
	// 	const promptOutput = await response.json();
	// 	if (response.status !== 200) {
	// 		throw data.error || new Error(`Request failed with status ${response.status}`);
	// 	}
	// 	message.channel.send(promptOutput.result);
	// } catch(error) {
	// 	// Consider implementing your own error handling logic here
	// 	console.error(error);
	// 	console.log('error'+error.message);
	// }

	// const response = await ChatGPT(promptInput);
	// console.log("gpt response:"+response);

});
// USAGE:
/*

*/
// TODO:
//define personalized response
