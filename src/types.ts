
// Types.ts
export enum MessageType {
  USER = "user",
  BOT = "bot",
}

export interface MessageButton {
  text: string;
  url: string;
}

export interface Message {
  id: string;
  type: MessageType;
  text: string;
  timestamp: Date;
  buttons?: MessageButton[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  preferences?: {
    brands: string[];
    categories: string[];
    keywords: string[];
  };
  notificationSettings?: {
    email: boolean;
    browser: boolean;
    sms: boolean;
  };
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price?: number;
  releaseDate?: Date;
  image?: string;
  url?: string;
  isAvailable: boolean;
  hot?: boolean;
}
