
export enum Gender {
  MALE = '男',
  FEMALE = '女',
  UNISEX = '中性'
}

export enum Style {
  CLASSIC = '古风典雅',
  MODERN = '现代简约',
  POETIC = '诗词出处',
  NATURAL = '清新自然',
  ACADEMIC = '博学睿智'
}

export interface NamingRequest {
  surname: string;
  gender: Gender;
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
