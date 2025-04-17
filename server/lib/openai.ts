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
  improvements: {
    category: 'performance' | 'readability' | 'best_practices' | 'error_handling';
    title: string;
    description: string;
    severity: 'high' | 'medium' | 'low';
    learn_more_url?: string;
    original_code?: string;
    optimized_code?: string;
  }[];
  summary: {
    total_issues: number;
    performance_issues: number;
    readability_issues: number;
    best_practices_issues: number;
    error_handling_issues: number;
  };
}> {
  try {
    const prompt = `
      You are an expert code optimizer. Analyze and optimize the following ${language} code to improve:
      1. Performance (e.g., algorithmic efficiency, memory usage, complexity)
      2. Readability (e.g., variable naming, code structure, comments)
      3. Best practices (e.g., language-specific conventions, design patterns)
      4. Error handling (e.g., validation, exception handling, edge cases)
      
      Original code:
      \`\`\`${language}
      ${code}
      \`\`\`
      
      Provide your response in this JSON format:
      {
        "optimized": "the complete optimized code here",
        "improvements": [
          {
            "category": one of ["performance", "readability", "best_practices", "error_handling"],
            "title": "Short title for the improvement",
            "description": "Detailed explanation of what was improved and why, including how this impacts the overall code quality",
            "severity": one of ["high", "medium", "low"],
            "learn_more_url": "Optional URL to documentation explaining this concept further",
            "original_code": "Optional snippet of the problematic original code",
            "optimized_code": "Optional snippet showing how this specific issue was fixed"
          }
        ],
        "summary": {
          "total_issues": number of total issues found,
          "performance_issues": number of performance issues,
          "readability_issues": number of readability issues,
          "best_practices_issues": number of best practices issues,
          "error_handling_issues": number of error handling issues
        }
      }
      
      Important guidelines:
      1. For each improvement, provide detailed explanations that are educational and help the developer understand the reasoning
      2. Include specific code snippets where relevant to show the before/after for each improvement
      3. Prioritize the most impactful improvements first (high severity)
      4. Suggest meaningful learn_more_url links to relevant documentation or articles that explain the concept further
      5. Make sure the optimized code is complete and incorporates all your suggested improvements
      6. Assign severity based on impact: high (critical issues), medium (important improvements), low (minor enhancements)
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content || '{"optimized":"","improvements":[],"summary":{"total_issues":0,"performance_issues":0,"readability_issues":0,"best_practices_issues":0,"error_handling_issues":0}}';
    const result = JSON.parse(content);
    
    // Add default learn_more_url if not provided
    result.improvements = result.improvements.map((improvement: {
      category: 'performance' | 'readability' | 'best_practices' | 'error_handling';
      learn_more_url?: string;
      [key: string]: any;
    }) => {
      if (!improvement.learn_more_url) {
        // Provide default URLs based on category
        const defaultUrls: Record<string, string> = {
          performance: "https://web.dev/articles/optimize-vitals",
          readability: "https://github.com/ryanmcdermott/clean-code-javascript",
          best_practices: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
          error_handling: "https://www.joyent.com/node-js/production/design/errors"
        };
        
        return {
          ...improvement,
          learn_more_url: defaultUrls[improvement.category] || "https://developer.mozilla.org/en-US/docs"
        };
      }
      return improvement;
    });
    
    return {
      optimized: result.optimized,
      improvements: result.improvements,
      summary: result.summary
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

    const content = response.choices[0].message.content || '{"score":50,"feedback":{"strengths":[],"weaknesses":[],"suggestions":[]}}';
    const result = JSON.parse(content);
    
    return {
      score: result.score,
      feedback: result.feedback,
    };
  } catch (error) {
    console.error("Error scoring code:", error);
    throw new Error("Failed to score code. Please try again.");
  }
}
