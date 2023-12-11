import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './componentes/login-doc';
import { Citas } from './componentes/citas';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/citas" element={<Citas />} /> 
      </Routes>
    </Router>
  );
};

export default App;
