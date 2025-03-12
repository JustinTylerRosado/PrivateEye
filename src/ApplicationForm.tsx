import * as React from 'react';
import { useState } from 'react';

export interface Application {
  id: number;
  company: string;
  jobTitle: string;
  status: string;
  dateApplied: string;
}

const ApplicationForm: React.FC = () => {
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [status, setStatus] = useState('');
  const [dateApplied, setDateApplied] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newApplication: Application = {
      id: Date.now(), // Generate a unique ID based on timestamp
      company,
      jobTitle,
      status,
      dateApplied,
    };

    // Retrieve any existing applications from localStorage
    const storedApps = localStorage.getItem('applications');
    let applications: Application[] = storedApps ? JSON.parse(storedApps) : [];

    // Add the new application and store the updated list
    applications.push(newApplication);
    localStorage.setItem('applications', JSON.stringify(applications));

    // Clear the form fields
    setCompany('');
    setJobTitle('');
    setStatus('');
    setDateApplied('');
  };

  return (
    <div className="application-form">
      <h2>Add Application</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Company:</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Job Title:</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date Applied:</label>
          <input
            type="date"
            value={dateApplied}
            onChange={(e) => setDateApplied(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplicationForm;
