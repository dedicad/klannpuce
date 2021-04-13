import { createContext, useContext } from "react";

export type Role = "student" | "teacher" | "admin"

interface AuthContextProps {
    authToken: string | null;
    setContextToken: (authToken: string) => void;
    role: Role | null;
    setContextRole: (role: Role) => void;
}
const AuthContext = createContext({} as AuthContextProps);

function useAuth(): AuthContextProps {
    return useContext(AuthContext);
}

export { AuthContext, useAuth };
