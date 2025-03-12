import * as React from 'react';
import ApplicationForm from './ApplicationForm';
import InterviewCalendar from './InterviewCalendar';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <div className="left-pane">
        <ApplicationForm />
      </div>
      <div className="right-pane">
        <InterviewCalendar />
      </div>
    </div>
  );
};

export default HomePage;