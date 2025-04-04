export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          created_at: string;
          name: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
        };
      };
      quizzes: {
        Row: {
          id: string;
          created_at: string;
          section: string;
          questions: {
            question: string;
            options: {
              value: string;
              text: string;
            }[];
          }[];
          correct_answers: Record<string, string>;
        };
        Insert: {
          id?: string;
          created_at?: string;
          section: string;
          questions: {
            question: string;
            options: {
              value: string;
              text: string;
            }[];
          }[];
          correct_answers: Record<string, string>;
        };
        Update: {
          id?: string;
          created_at?: string;
          section?: string;
          questions?: {
            question: string;
            options: {
              value: string;
              text: string;
            }[];
          }[];
          correct_answers?: Record<string, string>;
        };
      };
      user_answers: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          quiz_id: string;
          answers: Record<string, string>;
          score: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          quiz_id: string;
          answers: Record<string, string>;
          score: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          quiz_id?: string;
          answers?: Record<string, string>;
          score?: number;
        };
      };
    };
  };
}