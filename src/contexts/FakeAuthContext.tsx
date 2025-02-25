import { createContext, ReactNode, useReducer } from "react";
import { AuthContextType, authtype } from "../authinterface";


export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: {
        name: "",
        email: "",
        password: "",
        avatar: ""
    },
    login: Function,
    logout: Function
});

const initialState = {
    user: null,
    isAuthenticated: false
}

type AuthState = {
    user: null | authtype;
    isAuthenticated: boolean;
}

enum ActionTypes {
    LOGIN = 'login',
    LOGOUT = 'logout'
}

type AuthAction = {
    type: ActionTypes;
    payload: {
        name: string;
        email: string;
        password: string;
        avatar: string;
    }
}

function reducer(state: AuthState, action: AuthAction) {
    switch(action.type) {
        case 'login':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            };
        case 'logout':
            return {
                ...state,
                user: null,
                isAuthenticated: false
            };
        default:
            throw new Error("Unknown action");
    }
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

export function AuthProvider(props: {children: ReactNode}) {
    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState)

    function login(email: string, password: string) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({
                type: ActionTypes.LOGIN,
                payload: FAKE_USER
            });
        }
    }

    function logout() {
        dispatch({
            type: ActionTypes.LOGOUT,
            payload: {
                name: "",
                email: "",
                password: "",
                avatar: ""
            }
        });
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>
            {props.children}
        </AuthContext.Provider>
    );
}

/*export function useAUTH() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("AuthContext was used outside AuthProvider");
    }
}*/