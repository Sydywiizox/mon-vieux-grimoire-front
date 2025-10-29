import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type AuthContextValue = {
  token: string | null;
  userId: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [userId, setUserId] = useState<string | null>(() =>
    localStorage.getItem("userId")
  );

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch(
      `${
        import.meta.env.VITE_API_URL ?? "http://localhost:4000"
      }/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    if (!res.ok) throw new Error("Échec de la connexion");
    const data = await res.json();
    setToken(data.token);
    setUserId(data.userId);
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.userId);
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    const res = await fetch(
      `${
        import.meta.env.VITE_API_URL ?? "http://localhost:4000"
      }/api/auth/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    if (!res.ok) throw new Error("Échec de l'inscription");
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }, []);

  const value = useMemo(
    () => ({ token, userId, login, signup, logout }),
    [token, userId, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
