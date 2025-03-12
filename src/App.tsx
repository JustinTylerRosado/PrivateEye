import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './HomePage';
import Applications from './Applications';
import CalendarPage from './CalendarPage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;