/* eslint-disable @typescript-eslint/no-unsafe-function-type */
export interface authtype {
    name: string,
    email: string,
    password: string,
    avatar: string
}

export type AuthContextType = {
    isAuthenticated: boolean,
    user: authtype | null
    login: Function,
    logout: Function
}

