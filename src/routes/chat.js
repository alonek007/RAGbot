const router = require("express").Router();
const prisma = require("../prisma/client")
const askGemini = require("../service/gemini");


router.post("/", async function(req, res) {
    const {conversationId, message} = req.body
    await prisma.message.create({
        data: {
            role: "user",
            content: message,
            conversationId
        }
    })



    const messages =
  await prisma.message.findMany({
    where: {
      conversationId
    },
    orderBy: {
      createdAt: "asc"
    }
  });

  const history = messages
  .map(
    function(msg) {

      return `${msg.role}: ${msg.content}`
 })
  .join("\n");

  const prompt = `
${history}

user: ${message}
assistant:
`;

const aiRes =
  await askGemini(prompt);

    await prisma.message.create({
        data: {
            role: "assistant",
            content: aiRes,
            conversationId
        }
    })

    res.json({
        response: aiRes})
})


module.exports = router;
