import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/lib/types";
import { mockUsers } from "@/lib/mockData";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem("feedbackUser");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          // Verify user still exists in our mock data
          const validUser = mockUsers.find((u) => u.id === userData.id);
          if (validUser) {
            setUser(validUser);
          } else {
            localStorage.removeItem("feedbackUser");
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        localStorage.removeItem("feedbackUser");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Find user in mock data
      const foundUser = mockUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase(),
      );

      if (!foundUser) {
        return { success: false, error: "User not found" };
      }

      // For demo purposes, accept any password that's not empty
      if (!password || password.length < 3) {
        return {
          success: false,
          error: "Password must be at least 3 characters",
        };
      }

      // For demo, we'll accept "password" or "demo" as valid passwords
      if (password !== "password" && password !== "demo") {
        return {
          success: false,
          error: "Invalid password. Use 'password' or 'demo'",
        };
      }

      setUser(foundUser);
      localStorage.setItem("feedbackUser", JSON.stringify(foundUser));

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "An unexpected error occurred" };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("feedbackUser");
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
