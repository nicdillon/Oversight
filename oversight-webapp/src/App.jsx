import Home from './pages/Home.jsx';
import Layout from './pages/Layout.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Library from './pages/Library.jsx';
import NoPage from './pages/NoPage.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Profile from './pages/Profile.jsx';
import useLocalStorage from 'use-local-storage';
import './App.css';

function App() {

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [darkMode] = useLocalStorage('darkMode', defaultDark ? 'dark' : 'light');

  const colors = {"primary": darkMode === 'dark' ? "#fbfbff" : "#040f16",
    "secondary": darkMode === 'dark' ? "#ccb14e" : "#bf0603"
   }

  const theme = createTheme({
    palette: {
      primary: { main: colors.primary },
      secondary: { main: colors.secondary },
    },
  });

  return (
    <div className="app" data-theme={darkMode}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="profile" element={<Profile />} />
              <Route path="login" element={<Login />} />
              <Route path="library" element={<Library />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div >
  );
}

export default App;
