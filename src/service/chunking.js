const {RecursiveCharacterTextSplitter} = require("@langchain/textsplitters");



async function splitDocument(text) {
const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200})
return await  splitter.splitText(text)

}





module.exports = splitDocument;