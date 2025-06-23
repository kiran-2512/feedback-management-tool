// src/lib/mockData.ts

export const mockUsers = [
    { id: 1, name: "Alice", role: "manager" },
    { id: 2, name: "Bob", role: "employee" },
  ];
  
  // export const mockFeedbacks = [
  //   { id: 1, userId: 2, feedback: "Great work environment!" },
  //   { id: 2, userId: 1, feedback: "Need better equipment." },
  // ];
  export const mockFeedbacks = [
    { id: 1, userId: 2, feedback: "Great job!", createdAt: new Date("2024-06-01T10:00:00Z"), managerId: 1, employeeId: 2, sentiment: "positive", acknowledged: true, strengths: "Teamwork", improvements: "Time management" },
    { id: 2, userId: 3, feedback: "Needs improvement.", createdAt: new Date("2024-06-05T12:00:00Z"), managerId: 1, employeeId: 3, sentiment: "negative", acknowledged: false, strengths: "Technical skills", improvements: "Communication" },
    // ...other feedbacks with createdAt, managerId, employeeId, sentiment, acknowledged, strengths, improvements
  ];