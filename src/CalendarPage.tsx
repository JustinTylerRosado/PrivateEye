import * as React from 'react';
import InterviewCalendar from './InterviewCalendar';
import './CalendarPage.css';

const CalendarPage: React.FC = () => {
  return (
    <div className="calendar-page">
      <InterviewCalendar />
    </div>
  );
};

export default CalendarPage;