
export enum Gender {
  MALE = '男',
  FEMALE = '女',
  UNISEX = '中性/通用'
}

export enum NamingType {
  PERSON = '宝宝/个人',
  COMPANY = '公司/企业',
  BRAND = '品牌/产品',
  PET = '宠物/爱宠'
}

export enum Style {
  CLASSIC = '古风典雅',
  MODERN = '现代简约',
  POETIC = '诗词出处',
  NATURAL = '清新自然',
  ACADEMIC = '博学睿智',
  CREATIVE = '创意独特',
  PROFESSIONAL = '稳重大气'
}

export interface NamingRequest {
  type: NamingType;
  surname: string; // 对于公司/品牌，此处可用作前缀或行业关键词
  gender?: Gender;
  style: Style;
  preferences: string;
  birthYear?: number;
}

export interface NameResult {
  fullName: string;
  meaning: string;
  source?: string; // e.g., "《诗经·郑风》"
  elements: string[]; // e.g., ["木", "火"]
  analysis: string;
}

export interface GenerationState {
  loading: boolean;
  results: NameResult[];
  error: string | null;
}
