import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "YOUR_API_KEY";
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateResponse = async ({ message, image = null }) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const contents = [];

    if (image) {
      const imageData = await convertImageToBase64(image);
      contents.push({
        role: "user",
        parts: [
          { inline_data: { mime_type: image.type, data: imageData } },
          { text: message },
        ],
      });
    } else {
      contents.push({
        role: "user",
        parts: [{ text: message }],
      });
    }

    const result = await model.generateContentStream({ contents });
    return result;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
