const router = require("express").Router();
const multer = require("multer");
const pdf = require("pdf-parse");
const path = require("path")
const prisma = require("../prisma/client")
const splitDocument = require("../service/chunking");
const processDocument = require("../service/processing");
const { storeChunks } = require("../service/vectorStore");

const upload = multer({
    dest: "uploads/"
});


router.post("/", upload.single("file"), async function(req , res) {
    const fs = require("fs");
console.log(req.file);
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdf(dataBuffer);
    

    const document = await prisma.document.create({
        data: {
            filename: req.file.originalname,
            content: pdfData.text
        }

    })
     fs.unlinkSync(req.file.path);

    const chunks =
  await splitDocument(
    document.content
  );

console.log(chunks);
    const embeddedChunks =
  await processDocument(
    document.content
  );


  await storeChunks( embeddedChunks, document.id);

return res.json({
  chunks: embeddedChunks.length,
  vectorLength:
    embeddedChunks[0].embedding.length,
  sampleText:
    embeddedChunks[0].text.slice(0, 100)
});

   
})

module.exports = router;