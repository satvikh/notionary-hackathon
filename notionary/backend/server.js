const Groq = require("groq-sdk");
require("dotenv").config(); // Load environment variables

const { fetchFullNotes } = require("./services/notionService"); // ✅ added

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  const notionData = await fetchFullNotes(); // ✅ replaced hardcoded data

  const groqPrompt = `
You are an AI trained to create engaging quizzes from structured data. You will receive a JSON input that contains all the content of a Notion database. Your task is to generate a 20-question quiz based on this content, ensuring a mix of multiple-choice and free-response questions. 

### Guidelines:
1. **Question Variety:** 
   - 50% of the questions should be multiple-choice.
   - 50% of the questions should be free-response.
2. **Content Scope:**
   - Analyze key concepts, ideas, and factual information from the content.
   - Ensure questions are relevant and reflective of the provided data.
3. **Multiple-Choice Format:**
   - Include 4 answer choices.
   - Randomize the order of the correct and incorrect answers.
   - Indicate the correct answer with a key-value pair.
4. **Free-Response Format:**
   - Frame open-ended questions that encourage analytical thinking.
   - Avoid yes/no questions.
5. **Output Format:** 
   - Return the result in JSON format, and return only that and nothing else.
   - Use the following structure:

### 📚 Input JSON Sample:
${JSON.stringify(notionData, null, 2)}

---

### 📤 Expected Output JSON Format:
{
  "quiz": [
    { "id": "1",
      "question": "What is the primary goal of machine learning?",
      "type": "mcq",
      "options": [
        "To explicitly program computers for every task",
        "To enable computers to learn from data",
        "To design complex neural networks",
        "To replace traditional software development"
      ],
      "correctAnswer": "To enable computers to learn from data"
    },
    {
      "id": "2",
      "question": "Explain the process of photosynthesis in one sentence.",
      "type": "short_answer",
      "correctAnswer": "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water, generating oxygen as a byproduct."
    }
  ]
}
`;

  const chatCompletion = await getGroqChatCompletion(groqPrompt);
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

async function getGroqChatCompletion(prompt) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: {"type": "json_object"},
    model: "llama-3.3-70b-versatile",
  });
}

main().catch(console.error);
