"use client";

import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types/user";

interface UsernameLoginCredentials {
  username: string;
  password: string;
}

interface MobileLoginCredentials {
  phone_number: string;
  otp_code: string;
}

interface AuthContextType {
  user: Partial<User> | null;
  isLoading: boolean;
  userNameLogin: (credentials: UsernameLoginCredentials) => Promise<void>;
  mobileLogin: (credentials: MobileLoginCredentials) => Promise<void>;
  requestOTP: (mobile: string) => Promise<void>;
  register: (userData: User) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// helper function to save token data
interface TokenData {
  token: string;
}

export const saveTokenData = (tokenData: TokenData): void => {
  if (typeof window === "undefined") return;

  localStorage.setItem("token", tokenData.token);
};

export const saveUserDate = (userData: Partial<User>): void => {
  if (typeof window === "undefined") return;

  localStorage.setItem("authUser", JSON.stringify(userData));
  localStorage.setItem("loss-parameter-allowed", JSON.stringify(false));
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Partial<User> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initAuth = () => {
      try {
        if (typeof window !== "undefined") {
          const storedUser = localStorage.getItem("authUser");
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
          }
        }
      } catch (error) {
        console.error("Failed to parse user data:", error);
        if (typeof window !== "undefined") {
          localStorage.removeItem("authUser");
        }
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const userNameLogin = async (
    credentials: UsernameLoginCredentials
  ): Promise<void> => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/authentication/login/username/`,
        credentials
      );

      const { data } = response.data;

      if (data.error_status) {
        throw new Error(data.error_message || "Login failed");
      }

      // Save tokens
      if (data.token) {
        saveTokenData({ token: data.token });
      }

      // Create user object from response
      const userData: Partial<User> = {
        username: data.username || "",
        email: data.email || "",
      };

      setUser(userData);
      if (userData) {
        saveUserDate(userData);
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const mobileLogin = async (
    credentials: MobileLoginCredentials
  ): Promise<void> => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/authentication/login/phone_number/`,
        credentials
      );

      const { data } = response.data;

      if (data.error_status) {
        throw new Error(data.error_message || "Login failed");
      }

      // Save tokens
      if (data.token) {
        saveTokenData({ token: data.token });
      }

      // Create user object from response
      const userData: Partial<User> = {
        username: data.username || "",
        email: data.email || "",
      };

      setUser(userData);
      if (userData) {
        saveUserDate(userData);
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const requestOTP = async (mobile: string): Promise<void> => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/authentication/request-otp/`,
        {
          phone_number: mobile,
        }
      );
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const register = async (userData: User): Promise<void> => {
    try {
      setIsLoading(true);

      setUser(userData);
      if (typeof window !== "undefined") {
        saveUserDate(userData);
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("authUser");
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        userNameLogin,
        mobileLogin,
        requestOTP,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
