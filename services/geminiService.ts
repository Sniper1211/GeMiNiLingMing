
import { GoogleGenAI, Type } from "@google/genai";
import { NamingRequest, NameResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const NAME_SCHEMA = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      fullName: { type: Type.STRING, description: '完整姓名，含姓氏' },
      meaning: { type: Type.STRING, description: '名字的核心含义和寓意' },
      source: { type: Type.STRING, description: '名字的文学出处或典故，如《诗经》等，若无则留空' },
      elements: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: '名字对应的五行或自然元素，如 金、木、水、火、土'
      },
      analysis: { type: Type.STRING, description: '深层的文化解析和音韵美感分析' }
    },
    required: ["fullName", "meaning", "elements", "analysis"]
  }
};

export async function generateNames(req: NamingRequest): Promise<NameResult[]> {
  const prompt = `
    你是一位精通中国传统文化、文学、音韵学和姓名学的取名大师。
    请根据以下要求为用户推荐 6 个优秀的名字：
    - 姓氏: ${req.surname}
    - 性别: ${req.gender}
    - 风格倾向: ${req.style}
    - 用户额外要求: ${req.preferences}
    ${req.birthYear ? `- 出生年份: ${req.birthYear}` : ''}

    要求：
    1. 名字必须悦耳动听，读音和谐。
    2. 寓意深远，能够体现中国文化的底蕴。
    3. 结合用户要求的风格。如果是"诗词出处"，请务必提供具体的经典古诗词出处。
    4. 结果请严格按 JSON 格式返回。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: NAME_SCHEMA,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    const text = response.text;
    if (!text) throw new Error("AI 未能生成内容");
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("名字生成失败，请稍后重试。");
  }
}
