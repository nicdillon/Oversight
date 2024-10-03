import Switch from '@mui/material/Switch';
import useLocalStorage from 'use-local-storage';


const label = { inputProps: { 'aria-label': 'Theme Switch' } };


export default function ThemeSwitch() {
    const [darkMode, setDarkMode] = useLocalStorage('darkMode');

    return <div>
        <Switch {...label} color={darkMode === "dark" ? "primary" : "secondary"} onChange={() => setDarkMode(darkMode === "dark" ? "light" : "dark")} checked={darkMode === "dark"} />
    </div>
}

