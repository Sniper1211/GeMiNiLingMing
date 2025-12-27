
import { GoogleGenAI, Type } from "@google/genai";
import { NamingRequest, NameResult, NamingType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const NAME_SCHEMA = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      fullName: { type: Type.STRING, description: '完整姓名/公司名/品牌名' },
      meaning: { type: Type.STRING, description: '名字的核心含义和寓意' },
      source: { type: Type.STRING, description: '名字的文学出处、典故或设计灵感来源' },
      elements: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: '名字对应的五行元素、行业属性或核心特质关键词'
      },
      analysis: { type: Type.STRING, description: '深层的文化解析、音韵美感分析或商业价值评估' }
    },
    required: ["fullName", "meaning", "elements", "analysis"]
  }
};

export async function generateNames(req: NamingRequest): Promise<NameResult[]> {
  let contextPrompt = '';
  let requirementPrompt = '';

  switch (req.type) {
    case NamingType.COMPANY:
      contextPrompt = `你是一位精通品牌营销、企业战略和中国传统文化的商业命名专家。
      请为一家${req.surname}行业的公司推荐 6 个优秀的名字。`;
      requirementPrompt = `
      1. 名字必须大气响亮，易于传播和记忆。
      2. 结合行业属性（${req.surname}），体现专业度和未来感。
      3. 考虑商业运势和吉祥寓意。
      `;
      break;
    case NamingType.BRAND:
      contextPrompt = `你是一位富有创意的资深品牌策划大师。
      请为${req.surname}类别的产品推荐 6 个独特的品牌名称。`;
      requirementPrompt = `
      1. 名字必须新颖独特，能够迅速占领消费者心智。
      2. 符合目标受众的审美，具有辨识度。
      3. 易于进行 Logo 设计和视觉延展。
      `;
      break;
    case NamingType.PET:
      contextPrompt = `你是一位充满爱心的宠物专家和语言艺术家。
      请为一只${req.gender}性宠物（主人姓${req.surname}）推荐 6 个可爱的名字。`;
      requirementPrompt = `
      1. 名字必须朗朗上口，方便主人呼唤。
      2. 活泼可爱，能够体现宠物的灵性。
      3. 可以结合食物、自然、叠词等元素。
      `;
      break;
    case NamingType.PERSON:
    default:
      contextPrompt = `你是一位精通中国传统文化、文学、音韵学和姓名学的取名大师。
      请根据以下要求为用户推荐 6 个优秀的个人名字：
      - 姓氏: ${req.surname}
      - 性别: ${req.gender}
      ${req.birthYear ? `- 出生年份: ${req.birthYear}` : ''}`;
      requirementPrompt = `
      1. 名字必须悦耳动听，读音和谐。
      2. 寓意深远，能够体现中国文化的底蕴。
      3. 结合五行八字（如有年份）和音律美学。
      `;
      break;
  }

  const prompt = `
    ${contextPrompt}
    - 风格倾向: ${req.style}
    - 用户额外要求: ${req.preferences}

    通用要求：
    1. ${requirementPrompt}
    2. 结合用户选择的风格（${req.style}）。如果是"诗词出处"，请务必提供具体的经典古诗词出处；如果是商业命名，请提供设计灵感来源。
    3. 结果请严格按 JSON 格式返回。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: NAME_SCHEMA,
        temperature: 0.85, // 稍微提高创造性
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
