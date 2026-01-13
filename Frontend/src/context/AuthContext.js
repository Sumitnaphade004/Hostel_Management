import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import ApiRequest from "../api/ApiRequest";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const res = await ApiRequest("/me");
      setUser(res.user);
    } catch (error) {
      setUser(null);
    } finally{
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  });

  return <AuthContext.Provider value={{user, loading, fetchUser}}>
      {children}
    </AuthContext.Provider>;
}

export function useUser() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within AuthProvider");
  }
  return context;
}

export default AuthContext;
