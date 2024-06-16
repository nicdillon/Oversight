import Home from './pages/Home.jsx';
import Layout from './pages/Layout.jsx';
import About from './pages/About.jsx';
import NoPage from './pages/NoPage.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import './App.css';

function App() {

  const theme = createTheme({
    palette: {
      primary: { main: '#0B4F6C' },
      secondary: { main: '#FCCA46' },
    },
  });

  return (
    <div className="container">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              {/* <Route path="profile" element={<Profile />} /> */}
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
