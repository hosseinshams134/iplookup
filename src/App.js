import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import Login from './components/Login';
import 'leaflet/dist/leaflet.css';
import VerifyCode from './components/VerifyCode';
import SearchIP from './components/SearchIP';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/verify" element={<VerifyCode />} />
          <Route path="/search" element={<SearchIP />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;