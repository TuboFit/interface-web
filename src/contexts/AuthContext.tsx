import { createContext, useCallback, useContext, useState } from "react";
import { turbofit_api } from "../services/turbo_fit_api";
interface TokenState {
    token: string;
}
interface AuthContextState {
    token: TokenState;
    signIn({ email, password }: UserData): Promise<void>;
    userLooged(): boolean;
}
interface UserData {
    email: string;
    password: string;
}
const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC = ({ children }) => {
    const [token, setToken] = useState<TokenState>(() => {
        const token = localStorage.getItem("@turbofit:token");

        if (token) {
            turbofit_api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            return { token };
        }

        return {} as TokenState;
    });
    const signIn = useCallback(async ({ email, password }: UserData) => {
        const response = await turbofit_api.post('/usuarios/login', {
            email,
            password
        })
        const { token, useReturns } = response.data;
        setToken(token)
        localStorage.setItem('@turbofit:token', token);
        localStorage.setItem('@turbofit:userData', JSON.stringify(useReturns))
        turbofit_api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }, [])

    const userLooged = useCallback(() => {
        const token = localStorage.getItem('@turbofit:token');
        return token ? true : false
    }, [])
    return (
        <AuthContext.Provider value={{
            token,
            signIn,
            userLooged
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContextState {
    const context = useContext(AuthContext);
    return context

}
export { useAuth, AuthProvider }