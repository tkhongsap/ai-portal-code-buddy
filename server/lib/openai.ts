import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Chat completion function
export async function generateChatResponse(prompt: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content || "No response generated.";
  } catch (error) {
    console.error("Error generating chat response:", error);
    throw new Error("Failed to generate AI response. Please try again.");
  }
}

// Code optimization function
export async function optimizeCode(code: string, language: string): Promise<{
  optimized: string;
  improvements: { title: string; description: string }[];
}> {
  try {
    const prompt = `
      You are an expert code optimizer. Analyze and optimize the following ${language} code to improve:
      1. Performance
      2. Readability
      3. Best practices
      4. Error handling
      
      Original code:
      \`\`\`${language}
      ${code}
      \`\`\`
      
      Provide your response in this JSON format:
      {
        "optimized": "the optimized code here",
        "improvements": [
          {
            "title": "Short title for the improvement",
            "description": "Detailed explanation of what was improved and why"
          }
        ]
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content);
    
    return {
      optimized: result.optimized,
      improvements: result.improvements,
    };
  } catch (error) {
    console.error("Error optimizing code:", error);
    throw new Error("Failed to optimize code. Please try again.");
  }
}

// Code scoring function
export async function scoreCode(code: string, language: string): Promise<{
  score: number;
  feedback: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
}> {
  try {
    const prompt = `
      You are an expert code reviewer. Evaluate the following ${language} code against industry standards and best practices.
      Score it out of 100 and provide specific feedback.
      
      Code to evaluate:
      \`\`\`${language}
      ${code}
      \`\`\`
      
      Provide your response in this JSON format:
      {
        "score": number between 0 and 100,
        "feedback": {
          "strengths": ["strength 1", "strength 2", ...],
          "weaknesses": ["weakness 1", "weakness 2", ...],
          "suggestions": ["suggestion 1", "suggestion 2", ...]
        }
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content);
    
    return {
      score: result.score,
      feedback: result.feedback,
    };
  } catch (error) {
    console.error("Error scoring code:", error);
    throw new Error("Failed to score code. Please try again.");
  }
}
