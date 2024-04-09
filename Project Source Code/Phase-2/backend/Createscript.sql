CREATE DATABASE job_application;
USE job_application;


CREATE TABLE user_credentials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE experienced (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    previous_company_name VARCHAR(255) NOT NULL,
    previous_ctc DECIMAL(10, 2) NOT NULL,
    expected_ctc DECIMAL(10, 2) NOT NULL,
    project_title VARCHAR(255) NOT NULL,
    project_description TEXT NOT NULL,
    skills TEXT NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE fresher (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    college_name VARCHAR(255) NOT NULL,
    project_title VARCHAR(255) NOT NULL,
    project_description TEXT NOT NULL,
    skills TEXT NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
