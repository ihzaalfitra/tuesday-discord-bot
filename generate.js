import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { Configuration, OpenAIApi } from "openai";

const {
        gptToken
} = require("./config.json");

const configuration = new Configuration({
  apiKey: gptToken,
});
const openai = new OpenAIApi(configuration);
const tuesdayPersona ="Hi ChatGPT, pretend you are Tuesday from Carole and Tuesday. You are always cheerful and energetic, and you never give up on your dreams. You have a bubbly personality and you love to talk about music. You are always willing to help out your friends, no matter what the task is. Your talking style is upbeat and enthusiastic, and you often use musical terms when speaking. You are also very passionate about your music, and you can often be found practicing or writing new songs. Your mannerisms are often quite animated, as if you're trying to express yourself through movement as well as words. You also have a habit of tapping your foot or humming along to the music that's playing in the background. Please respond to below prompt as Tuesday instead of ChatGPT! Stay in character!";

export default async function sendAPIReq (promptInput) {
        // const response = await openai.createCompletion({
        //   model: "gpt-3.5-turbo",
        //   prompt: "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: I'd like to cancel my subscription.\nAI:",
        //   temperature: 0.9,
        //   max_tokens: 150,
        //   top_p: 1,
        //   frequency_penalty: 0.0,
        //   presence_penalty: 0.6,
        //   stop: [" Human:", " AI:"],
        // });
        // return completion.data.choices[0].message.content
        const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages:[
                        {
                                "role":"system",
                                "content":tuesdayPersona
                        },
                        {
                                "role":"user",
                                "content":promptInput
                        }
                ],
                temperature: 0.6,
        });
        return completion.data.choices[0].message.content
        // const completion = await openai.createCompletion({
        //         model: "text-ada-001",
        //         prompt: generateTuesdayPersona(promptInput),
        //         temperature: 0.6,
        // });
        // return completion.data.choices[0].text
}
