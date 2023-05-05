export interface Quiz {
    id: number;
    title: string;
    description: string;
    questions: Question[];
  }
  
  export interface Question {
    id: number;
    question: string;
    options: Option[];
    correctOptionId: number;
  }
  
  export interface Option {
    id: number;
    optionText: string;
  }
  