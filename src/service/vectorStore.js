const db = require("../../config/astra");


async function storeChunks(embeddedChunks, documentId) {
    const collection = db.collection("documents");

    for(const chunk of embeddedChunks) {
        await collection.insertOne({
            documentId,
            text: chunk.text,
            $vector: chunk.embedding
        })
    }
    
}

module.exports = {storeChunks}