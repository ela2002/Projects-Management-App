import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Projects from './pages/Projects/Projects';
import Tasks from './pages/Tasks/Tasks';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<Tasks />} />
      </Routes>
    </Router>
  );
}

export default App;