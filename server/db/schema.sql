DROP DATABASE IF EXISTS privateeye_db;

CREATE DATABASE privateeye_db;
\c privateeye_db

-- Users table (if authentication is required)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Companies table
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    website VARCHAR(255),
    industry VARCHAR(100),
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Statuses table (e.g., Applied, Interviewing, Offer, Rejected)
CREATE TABLE statuses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Applications table
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    company_id INT NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    job_description TEXT,
    job_link VARCHAR(255),
    status_id INT NOT NULL,
    applied_date DATE NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (status_id) REFERENCES statuses(id) ON DELETE CASCADE
);

-- Notes table (for tracking notes on applications)
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    application_id INT NOT NULL,
    user_id INT NOT NULL,
    note TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Interviews table (to track interview details)
CREATE TABLE interviews (
    id SERIAL PRIMARY KEY,
    application_id INT NOT NULL,
    interview_date TIMESTAMP NOT NULL,
    interviewer VARCHAR(255),
    interview_notes TEXT,
    outcome VARCHAR(10) CHECK (outcome IN ('Pending', 'Passed', 'Failed')) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
);

-- Trigger function to update last_updated timestamp
CREATE OR REPLACE FUNCTION update_last_updated_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for applications table
CREATE TRIGGER update_last_updated
BEFORE UPDATE ON applications
FOR EACH ROW
EXECUTE FUNCTION update_last_updated_column();