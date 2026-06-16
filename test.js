const { GoogleGenAI }= require("@google/genai");



    const ai = new GoogleGenAI({apiKey:"AQ.Ab8RN6J5kb3gcOFtcSXohHzaNIr_FC_ZhbGnYA8alJeurfvLZw"});
async function embedTxt(text) {
    const response = await ai.models.embedContent({
        model: 'gemini-embedding-2',
        contents: text
    });

   return response.embeddings[0].values;
}


module.exports = embedTxt;

