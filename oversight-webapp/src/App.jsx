import Home from './pages/Home.jsx';
import Layout from './pages/Layout.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import NoPage from './pages/NoPage.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Profile from './pages/Profile.jsx';
import useLocalStorage from 'use-local-storage';
import './App.css';

function App() {

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [darkMode] = useLocalStorage('darkMode', defaultDark ? 'dark' : 'light');

  const theme = createTheme({
    palette: {
      primary: { main: '#bf0603' },
      secondary: { main: '#fcca46' },
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
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div >
  );
}

export default App;
