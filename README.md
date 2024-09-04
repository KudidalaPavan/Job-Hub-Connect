## JobHub Connect (Group 9 ) Alpha

**Directories:**

- Demo and Presentation / For PPT and DEMO of Project
- Meeting Minutes / For the record of meeting & Discussions
- GROUP INFO / For Group members Details & Skill Set
- Planning Documents / Planning Documents
- Project report/ Report of Project
- User Manual / detail description about project how to use
- Project Source Code/ Source Code of the Project (Phase-1,2,3)
- Note-Deliverable-1.txt / Directory of Deliverable -1
- Note-Deliverable-2.txt / Directory of Deliverable -2
- Note-Deliverable-3.txt / Directory of Deliverable -3
- Note-Deliverable-4.txt / Directory of Deliverable -4
- Note-Deliverable-5.txt / Directory of Deliverable -5
- Phase-1 / First phase of project which contains source code
- Phase-2 / Second phase of project which contains source code
- Phase-3 / Third phase of project which contains source code


## Project Overview
JobHub Connect is a project aimed at developing a comprehensive job board platform that aggregates job listings from various sources to provide users with a centralized hub for streamlined job search. This report outlines the project's objectives, methodology, risk analysis, and the planned tech stack for development.

erDiagram
    Doctor {
        string SSN PK
        string FirstName
        string LastName
        string Speciality
        int YearsOfExperience
        string PhoneNumber
    }
    Patient {
        string SSN PK
        string FirstName
        string LastName
        string Address
        date DOB
        string PrimaryDoctor_SSN FK
    }
    Prescription {
        string PrescriptionID PK
        string TradeName FK
        int Units
        date Date
        string Doctor_SSN FK
        string Patient_SSN FK
    }
    Medicine {
        string TradeName PK
        float UnitPrice
        bool GenericFlag
    }
