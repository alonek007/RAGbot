const embedTxt = require("./embedding")
const db = require("../../config/astra");
async function retrieveChunks(question) {
    const questionEmbedding = await embedTxt(question)

    const collection = db.collection("documents")

    const cursor = await collection.find( {},
            {sort:  {$vector: questionEmbedding},
        limit: 1 } 
    )
    const result = await cursor.toArray();
    return result;
}

module.exports = retrieveChunks;