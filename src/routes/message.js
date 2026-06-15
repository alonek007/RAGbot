const router = require("express").Router();
const prisma = require("../prisma/client");
router.post("/", async function(req, res){
    const {role, content, conversationId} = req.body;
    const message = await prisma.message.create({
        data: {
            role,
            content,
            conversationId
        }
       
    })
     res.json(message)
})

router.get("/", async function(req, res) {
  const messages = await prisma.message.findMany({
    orderBy: {
      createdAt: "asc"
    }
  });

  res.json(messages);
});

module.exports = router;