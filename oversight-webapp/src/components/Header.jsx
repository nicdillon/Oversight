import { NavLink } from "react-router-dom";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import {useState} from 'react';

import './Header.css';

export default function Header() {
    const [activeLink, setActiveLink] = useState("home-link");

    return (
        <nav className="header">
            <ul>
                <li onClick={() => setActiveLink("home-link")}>
                    <HomeRoundedIcon color={activeLink == "home-link" ? "secondary" : "white"} />
                    <NavLink id="home-link" className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/">Home</NavLink>
                </li>
                <li onClick={() => setActiveLink("about-link")}>
                    <PsychologyAltRoundedIcon color={activeLink == "about-link" ? "secondary" : "white"} />
                    <NavLink id="about-link" className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/About">About</NavLink>
                </li>
                <li onClick={() => setActiveLink("profile-link")}>
                    <PersonRoundedIcon color={activeLink == "profile-link" ? "secondary" : "white"} />
                    <NavLink id="profile-link" className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/Profile">Profile</NavLink>
                </li>
            </ul>
        </nav>
    )
}