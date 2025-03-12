import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

export interface InterviewEvent {
  id: number;
  company: string;
  jobTitle: string;
  interviewTime: string;
  interviewDate: string; // Format "YYYY-MM-DD"
}

const InterviewCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);
  // Initialize interviewEvents state from localStorage
  const [interviewEvents, setInterviewEvents] = useState<InterviewEvent[]>(() => {
    const stored = localStorage.getItem('interviews');
    return stored ? JSON.parse(stored) : [];
  });

  // Save events to localStorage whenever interviewEvents state changes
  useEffect(() => {
    localStorage.setItem('interviews', JSON.stringify(interviewEvents));
    console.log("Saved interview events:", interviewEvents);
  }, [interviewEvents]);

  // onDateChange callback with "any" type for value to bypass type issues
  const onDateChange = (value: any) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      setShowForm(true);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setSelectedDate(value[0]);
      setShowForm(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const company = formData.get('company') as string;
    const jobTitle = formData.get('jobTitle') as string;
    const interviewTime = formData.get('interviewTime') as string;

    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      const newEvent: InterviewEvent = {
        id: Date.now(),
        company,
        jobTitle,
        interviewTime,
        interviewDate: formattedDate,
      };

      setInterviewEvents([...interviewEvents, newEvent]);
      setShowForm(false);
      form.reset();
    }
  };

  // Provide custom content for calendar tiles: show popover if events exist for the day
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const formattedTileDate = date.toISOString().split('T')[0];
      const eventsForDay = interviewEvents.filter(
        (event) => event.interviewDate === formattedTileDate
      );
      if (eventsForDay.length > 0) {
        return (
          <div className="tile-popover">
            {eventsForDay.map((event) => (
              <div key={event.id} className="popover-item">
                <strong>{event.company}</strong> - {event.jobTitle} @ {event.interviewTime}
              </div>
            ))}
          </div>
        );
      }
    }
    return null;
  };

  const handleClick = () => {
    // Handle click event
  };

  return (
    <div className="interview-calendar">
      <h2>Interview Calendar</h2>
      <ReactCalendar onChange={onDateChange as any} tileContent={tileContent} />
      {showForm && selectedDate && (
        <div className="interview-form">
          <h3>Add Interview for {selectedDate.toLocaleDateString()}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Company:
                <input type="text" name="company" required />
              </label>
            </div>
            <div className="form-group">
              <label>
                Job Title:
                <input type="text" name="jobTitle" required />
              </label>
            </div>
            <div className="form-group">
              <label>
                Interview Time:
                <input type="time" name="interviewTime" required />
              </label>
            </div>
            <div className="form-actions">
              <button type="submit">Add Interview</button>
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="events-list">
        <h3>Scheduled Interviews</h3>
        {interviewEvents.length === 0 ? (
          <p>No interviews scheduled.</p>
        ) : (
          <ul>
            {interviewEvents.map((event) => (
              <li key={event.id}>
                {new Date(event.interviewDate).toLocaleDateString()} - {event.company} for {event.jobTitle} at {event.interviewTime}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default InterviewCalendar;