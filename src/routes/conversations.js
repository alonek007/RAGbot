const router = require("express").Router();
const prisma = require("../prisma/client");


router.post("/", async function(req, res) {
    const conversation = await prisma.conversation.create({
        data: {}
    })

    res.json(conversation)
})

router.get("/:id", async function(req, res) {
    const {id} = req.params;

    const conversation = await prisma.conversation.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            message : true
        }
    })
    res.json(conversation)
})


module.exports = router;