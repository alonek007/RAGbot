const prisma = require("../prisma/client")
async function createMessage(req, res) {
    const {role, content, conversationId} = req.body;

const message= await prisma.message.create({
    data: {
      role,
      content,
      conversationId
    } 
});

    res.json(message);


  }

  module.exports = {createMessage}