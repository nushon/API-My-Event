CREATE DATABASE event;
USE event;

CREATE TABLE form (
    id INT PRIMARY KEY, 
    FOREIGN KEY (host_id) 
    REFERENCES host (host_id) ,
    event_name TEXT NOT NULL, 
    event_date date,
    event_location TEXT NOT NULL, 
    event_description TEXT NOT NULL, 
    FOREIGN KEY (speakers_id) 
    REFERENCES speakers (speakers_id),
    questions_obj TEXT NOT NULL UNIQUE
);

CREATE TABLE speakers (
    id INT PRIMARY KEY,
    name TEXT NOT NULL,
    bio TEXT NOT NULL,
    img url,
    position TEXT NOT NULL
);

CREATE TABLE events_questions (
    id INT PRIMARY KEY,
    name TEXT NOT NULL,
    dob DATE,
    address TEXT NOT NULL,
    reasons_to_attend TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    involvement TEXT NOT NULL,
    FOREIGN KEY (form_id)
    REFERENCES form (form_id),
);

CREATE TABLE host (
    id INT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    phone_number INT,
    organization_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    img url
);

CREATE TABLE participant (
    id INT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    phone_number INT,
    email TEXT NOT NULL UNIQUE,
    img url
);

CREATE TABLE users (
    id INT PRIMARY KEY,
    FOREIGN KEY (host_id)
    REFERENCES host (host_id),
    FOREIGN KEY (participant_id)
    REFERENCES participant (participant_id),
);