import { ReactNode, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute(props: {children: ReactNode}) {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, navigate]);

    return (
        isAuthenticated ? 
            <div>{ props.children }</div> :
            null
    );
}
