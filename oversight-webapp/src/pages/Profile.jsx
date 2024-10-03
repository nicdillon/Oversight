import './Profile.css';
import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {

    const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }
    
    return (
        <div className="profile-page">
            {!isAuthenticated && <h1>Identify Yourself!</h1> }
            {!isAuthenticated && <button onClick={() => loginWithRedirect()}>Log In</button> }
            {isAuthenticated && <div>
                <img className='profile-photo' src={user.picture} alt={user.name ?? "player photo"} />
                <h2>Welcome, {user.given_name ?? "Player"}</h2>
            </div>}
            {isAuthenticated && <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log Out
                </button> 
            }
        </div>
    );
}