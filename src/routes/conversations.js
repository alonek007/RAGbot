const router = require("express").Router();

const {
    createConversation 
} = require("../controllers/conversationController");

router.post("/", createConversation);
module.exports = router;