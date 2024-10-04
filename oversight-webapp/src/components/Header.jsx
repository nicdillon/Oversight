import { NavLink } from "react-router-dom";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import {useState} from 'react';
import ThemeSwitch from './ThemeSwitch';
import './Header.css';
import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
    var currentPage = window.location.pathname;
    const [activeLink, setActiveLink] = useState(currentPage);
    const { user, isAuthenticated } = useAuth0();

    return (
        <div className="header-container">
            <nav className="header">
                <ul>
                    <li onClick={() => setActiveLink("/")}>
                        <HomeRoundedIcon color={activeLink == "/" ? "secondary" : "primary"} />
                        <NavLink id="home-link" className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/">Home</NavLink>
                    </li>
                    <li onClick={() => setActiveLink("/Library")}>
                        <SportsEsportsIcon color={activeLink == "/Library" ? "secondary" : "primary"} />
                        <NavLink id="library-link" className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/Library">Library</NavLink>
                    </li>
                    <li onClick={() => setActiveLink("/Profile")}>
                        {(isAuthenticated && user.picture !== undefined) && <img className="header-profile-photo" size="64px" src={user.picture} alt={user.name ?? "player photo"} />}
                        {(!isAuthenticated || user.picture === undefined) && <PersonRoundedIcon color={activeLink == "/Login" ? "secondary" : "primary"} />}
                        <NavLink id="profile-link" className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/Profile">Profile</NavLink>
                    </li>
                    <li onClick={() => setActiveLink("/About")}>
                        <PsychologyAltRoundedIcon color={activeLink == "/About" ? "secondary" : "primary"} />
                        <NavLink id="about-link" className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/About">About</NavLink>
                    </li>
                </ul>
            </nav>

            <ThemeSwitch />
        </div>
    )
}