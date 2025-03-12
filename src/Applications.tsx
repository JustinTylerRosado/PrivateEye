import * as React from 'react';
import { useState, useEffect } from 'react';
import { Application } from './ApplicationForm';

const Applications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>(() => {
    const storedApps = localStorage.getItem('applications');
    return storedApps ? JSON.parse(storedApps) : [];
  });

  // Whenever applications change, update localStorage
  useEffect(() => {
    localStorage.setItem('applications', JSON.stringify(applications));
  }, [applications]);

  // Function to handle status updates
  const handleStatusChange = (id: number, newStatus: string) => {
    const updatedApps = applications.map((app) =>
      app.id === id ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApps);
  };

  return (
    <div className="applications-page">
      <h2>Applications</h2>
      {applications.length === 0 ? (
        <p>No applications submitted yet.</p>
      ) : (
        <ul className="applications-list">
          {applications.map((app) => (
            <li key={app.id} className="application-item">
              <strong>{app.company}</strong> – {app.jobTitle} –{' '}
              <select
                value={app.status}
                onChange={(e) => handleStatusChange(app.id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="denied">Application Denied</option>
                <option value="offer received">Offer Received</option>
              </select>{' '}
              (Applied: {app.dateApplied})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Applications;