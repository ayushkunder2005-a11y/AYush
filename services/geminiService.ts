
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePuzzle = async (user: UserProfile, mood: string, difficulty: number) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a cognitive puzzle for a ${user.age} year old studying ${user.course}. 
               Current user mood: ${mood}. Difficulty level (1-10): ${difficulty}. 
               Focus on their goals: ${user.focusGoals.join(', ')}.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          options: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING }
          },
          correctAnswer: { type: Type.STRING },
          explanation: { type: Type.STRING },
          difficultyBoost: { type: Type.NUMBER }
        },
        required: ["title", "description", "options", "correctAnswer", "explanation"]
      }
    }
  });
  
  return JSON.parse(response.text || '{}');
};

export const detectMood = async (base64Image: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
          { text: "Analyze the user's facial expression and posture. Return exactly one word from this list: Focused, Distracted, Fatigued, Confident, Anxious." }
        ]
      }
    });
    return response.text?.trim() || "Focused";
  } catch (e) {
    return "Focused"; // Fallback
  }
};

export const generateCognitiveShadowCommentary = async (userProfile: UserProfile, lastAction: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are the user's "Cognitive Shadow" (an AI thinking twin). 
               The user is ${userProfile.name}, studying ${userProfile.course}. 
               They just performed: ${lastAction}. 
               Provide a short, challenging, or supportive insight about their decision-making process. Be brief and witty.`
  });
  return response.text || '';
};

export const processDocument = async (base64Pdf: string, fileName: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        inlineData: {
          data: base64Pdf,
          mimeType: 'application/pdf'
        }
      },
      {
        text: `Analyze this document titled "${fileName}". 
        Act as a "Cognitive Shadow" (AI thinking twin). 
        Extract: 
        1. A core summary (2 sentences). 
        2. Three 'Logic Challenges' or questions for the user based on this text. 
        3. One 'Hidden Connection' the user might have missed.
        4. A comprehensive 'Knowledge Base' string (approx 500 words) that captures the most important facts, definitions, and arguments in the document so a voice assistant can accurately answer questions about it.
        Return the result as JSON.`
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          logicChallenges: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          hiddenConnection: { type: Type.STRING },
          knowledgeBase: { type: Type.STRING }
        },
        required: ["summary", "logicChallenges", "hiddenConnection", "knowledgeBase"]
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const queryDocumentContent = async (base64Pdf: string, query: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        inlineData: {
          data: base64Pdf,
          mimeType: 'application/pdf'
        }
      },
      {
        text: `You are the user's "Cognitive Shadow" (AI thinking twin). 
        Based on the provided document, answer the user's query: "${query}". 
        Stay in character: analytical, slightly provocative, and deeply insightful. 
        Refer specifically to names, modules, or logic diagrams found in the text if relevant. Keep it concise.`
      }
    ]
  });
  return response.text || "Neural connection error. My analysis of the document was interrupted.";
};
