const splitDocument = require("./chunking")
const embedTxt = require("./embedding")

async function processDocument(text){
    const chunks = await splitDocument(text) 
    const embeddedChunks = await Promise.all(chunks.map(async function(chunk){

        return {
        text: chunk,
        embedding: await embedTxt(chunk)
        }
    }))
    return embeddedChunks;
}

module.exports = processDocument;
