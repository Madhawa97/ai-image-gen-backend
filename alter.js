import { Configuration, OpenAIApi } from 'openai';
import { createReadStream, writeFileSync } from 'fs';

import * as dotenv from 'dotenv'                        // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

export const alter = async () => {
    const src = './img/1667733374415.png';                                // path to existing image
    // image must be a valid PNG file, less than 4MB, and square.

    const result = await openai.createImageVariation(
        createReadStream(`${src}`),                       // opening the file
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

    return url;
}
