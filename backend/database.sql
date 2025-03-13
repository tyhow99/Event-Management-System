CREATE DATABASE event_management;

-- Creating the Event_Schedule table
CREATE TABLE Event_Schedule (
    Event_id SERIAL PRIMARY KEY,
    Event_name VARCHAR(100) NOT NULL,
    Event_start TIME NOT NULL,
    Event_end TIME NOT NULL,
    Event_date DATE NOT NULL,
    Organizer VARCHAR(100) NOT NULL
);

-- Creating the Vendor_Information table
CREATE TABLE Vendor_Information (
    Vendor_id SERIAL PRIMARY KEY,
    Vendor_name VARCHAR(100) NOT NULL,
    Vendor_type VARCHAR(50) NOT NULL,
    Sections VARCHAR(100),
    Manager_id INT
);

-- Creating the Employee_Information table
CREATE TABLE Employee_Information (
    Worker_id SERIAL PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Phone_number VARCHAR(15),
    Email VARCHAR(100),
    Dob DATE NOT NULL,
    Job VARCHAR(50) NOT NULL
);

-- Creating the Worker_Schedule table
CREATE TABLE Worker_Schedule (
    Worker_id INT NOT NULL REFERENCES Employee_Information(Worker_id) ON DELETE CASCADE,
    Vendor_id INT NOT NULL REFERENCES Vendor_Information(Vendor_id) ON DELETE CASCADE,
    Event_id INT NOT NULL REFERENCES Event_Schedule(Event_id) ON DELETE CASCADE,
    Pay_rate NUMERIC(10, 2) NOT NULL,
    Worker_start TIME NOT NULL,
    Worker_end TIME NOT NULL,
    Section VARCHAR(50),
    PRIMARY KEY (Worker_id, Event_id)
);
