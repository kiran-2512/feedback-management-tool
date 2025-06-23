// src/lib/auth.ts

// CORRECT: This allows you to import { auth }
export const auth = {
    getCurrentUser: (username: string, password: string) => {
      // mock login logic
      return username === "admin" && password === "password";
    },
  };
// ✅ Correct: named export
export function getCurrentUser() {
    return { name: "admin", role: "manager" }; // or your actual logic
  }
  export function isManager(user: { role: string }) {
    return user.role === "manager";
  }  