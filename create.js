import { Configuration, OpenAIApi} from 'openai';
import { writeFileSync } from 'fs';

import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

const prompt = 'scary alien hiding in a nebula in space';

const result = await openai.createImage({
    prompt,
    n: 1, // no of images
    size: "1024x1024",
    user: process.env.USER_NAME
});

const url = result.data.data[0].url;
console.log(url);

// save the image to disk

const imageResult = await fetch(url);
const blob = await imageResult.blob();
const buffer = Buffer.from( await blob.arrayBuffer()); // turn the blob into a buffer
writeFileSync(`./img/${Date.now()}.png`, buffer);

