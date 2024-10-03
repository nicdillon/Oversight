import { NavLink } from "react-router-dom";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import {useState} from 'react';
import ThemeSwitch from './ThemeSwitch';
import './Header.css';

export default function Header() {
    var currentPage = window.location.pathname;
    const [activeLink, setActiveLink] = useState(currentPage);

    return (
        <div className="header-container">
            <nav className="header">
                <ul>
                    <li onClick={() => setActiveLink("/")}>
                        <HomeRoundedIcon color={activeLink == "/" ? "secondary" : "white"} />
                        <NavLink id="home-link" className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/">Home</NavLink>
                    </li>
                    <li onClick={() => setActiveLink("/About")}>
                        <PsychologyAltRoundedIcon color={activeLink == "/About" ? "secondary" : "white"} />
                        <NavLink id="about-link" className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/About">About</NavLink>
                    </li>
                    <li onClick={() => setActiveLink("/Profile")}>
                        <PersonRoundedIcon color={activeLink == "/Profile" ? "secondary" : "white"} />
                        <NavLink id="profile-link" className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/Profile">Profile</NavLink>
                    </li>
                </ul>
            </nav>

            <ThemeSwitch />
        </div>
    )
}