import { GoogleGenerativeAI } from "@google/generative-ai";

// I spend hour hor useless .env file without passing the api key itself i hate you CHATGPT cursor better ahahahah
const genAI = new GoogleGenerativeAI(`AIzaSyCl1rfyw3uurKHGD6qGIMwJDNNgKPJ2fIE`);

// Same as in flutter but no Promise but Future
export const generateContent = async (prompt): Promise<string> => {
    const model = genAI.getGenerativeModel({ model: prompt.model });
    const result = await model.generateContent(prompt.question);
    return result.response.text();
}