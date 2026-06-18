const router = require("express").Router();
const prisma = require("../prisma/client")
const askGemini = require("../service/gemini");
const retrieveChunks = require("../service/retrieval")


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
  const results = await retrieveChunks(
    message)
const context =
  results
    .map(function(doc) {
      return doc.text;
    })
    .join("\n\n");
  const prompt = `

  You are a RAG assistant.

Answer ONLY using the provided context.

If the answer is in the context, answer directly.

If the answer is not in the context, say:
"I don't know based on the provided context."


${history}
Context:
${context}

user: ${message}
assistant:
`;
console.log(prompt)
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
