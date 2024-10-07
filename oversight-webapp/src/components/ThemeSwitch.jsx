import Switch from '@mui/material/Switch';
import useLocalStorage from 'use-local-storage';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import './ThemeSwitch.css'

const label = { inputProps: { 'aria-label': 'Theme Switch' } };

export default function ThemeSwitch() {
    const [darkMode, setDarkMode] = useLocalStorage('darkMode');

    return (
        <div className='theme-switch-container'>
            {darkMode === 'dark' && <DarkModeIcon color={"primary"} />}
            {darkMode === 'light' && <LightModeIcon color={"primary"} />}
            <Switch {...label} onChange={() => setDarkMode(darkMode === "dark" ? "light" : "dark")} checked={darkMode === "dark"} />
        </div>
    )
}