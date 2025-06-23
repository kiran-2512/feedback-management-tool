// export type Feedback = {
//     id: number;
//     userId: number;
//     message: string;
//     date: Date;
//     sentiment: FeedbackSentiment;
//   };
  
//   export type FeedbackSentiment = "positive" | "neutral" | "negative";
  
export type FeedbackSentiment = "positive" | "neutral" | "negative";

export interface Feedback {
  id: string;
  employeeId: string;
  managerId: string;
  strengths: string;
  improvements: string;
  sentiment: FeedbackSentiment;
  acknowledged: boolean;
  createdAt: Date;
}