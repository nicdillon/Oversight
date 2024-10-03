import './Login.css';
import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return (
        <div className="login-container">
            {!isAuthenticated && <h1>Identify Yourself!</h1> }
            {!isAuthenticated && <button onClick={() => loginWithRedirect()}>Log In</button> }
            {isAuthenticated && <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log Out
            </button> }
        </div>
    )
}