-- --
CREATE DATABASE event_management;

CREATE TABLE event_schedule (
    event_id SERIAL PRIMARY KEY,
    event_name VARCHAR(100) NOT NULL,
    event_start TIME NOT NULL,
    event_end TIME NOT NULL,
    event_date DATE NOT NULL,
    organizer VARCHAR(100)
) START WITH 1000;

-- Creating the Vendor_Information table
CREATE TABLE vendor_information (
    vendor_id SERIAL PRIMARY KEY,
    vendor_name VARCHAR(100) NOT NULL,
    vendor_type VARCHAR(50) NOT NULL,
    sections VARCHAR(100),
    manager_id INT
) START WITH 1000;

-- Creating the Employee_Information table
CREATE TABLE employee_information (
    worker_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    email VARCHAR(100),
    dob DATE NOT NULL,
    job VARCHAR(50) NOT NULL
) START WITH 1000;

-- Creating the Worker_Schedule table
-- On delete cascade deletes all references to other tables
CREATE TABLE worker_schedule (
    worker_id INT NOT NULL REFERENCES employee_information(worker_id) ON DELETE CASCADE,
    vendor_id INT NOT NULL REFERENCES vendor_information(vendor_id) ON DELETE CASCADE,
    event_id INT NOT NULL REFERENCES event_schedule(event_id) ON DELETE CASCADE,
    pay_rate NUMERIC(10, 2) NOT NULL,
    worker_start TIME NOT NULL,
    worker_end TIME NOT NULL,
    section VARCHAR(50),
    PRIMARY KEY (worker_id)
);