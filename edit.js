import { Configuration, OpenAIApi } from 'openai';
import { createReadStream, writeFileSync } from 'fs';

import * as dotenv from 'dotenv'                        // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

const prompt = 'a flying sauser landing on a airport at afternoon'
const src = './img/1667733374415.png';      // image without mask
const mask = './img/1667733510714.png';     // transparent, masked image

const result = openai.createImageEdit(
    createReadStream(src),
    createReadStream(mask),
    prompt,
    1,
    "1024x1024"
);

const url = result.data.data[0].url;
console.log(url);


// save the image to disk

const imageResult = await fetch(url);
const blob = await imageResult.blob();
const buffer = Buffer.from(await blob.arrayBuffer());   // turn the blob into a buffer
writeFileSync(`./img/${Date.now()}.png`, buffer);

