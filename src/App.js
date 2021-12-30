import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Top from './elements/Top';
import Omikuji from './elements/Omikuji';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Top />} exact></Route>
        <Route path="/omikuji" element={<Omikuji />} exact></Route>
      </Routes>
    </Router>
  );
}

export default App;
