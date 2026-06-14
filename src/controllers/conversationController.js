const prisma = require("../prisma/client");
async function createConversation(req, res) {
    const conversation = await prisma.conversation.create({
        data: {},

    });
    res.json(conversation);
}

module.exports ={ createConversation }