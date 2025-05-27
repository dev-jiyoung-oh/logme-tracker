export interface Record {
  id: number;
  userId: number;
  title?: string;
  content?: string;
  recordDate: string; // 'YYYY-MM-DD' 형식 날짜 문자열
  createdAt: string; // ISO timestamp 문자열
  updatedAt: string; // ISO timestamp 문자열
  isDeleted: boolean;
  images?: RecordImage[];
}

export interface RecordImage {
  id: number;
  recordId: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}
