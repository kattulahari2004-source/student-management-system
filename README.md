# Student Management System

A web-based Student Management System built using Java, Spring Boot, Spring Data JPA, PostgreSQL, HTML, CSS, and JavaScript.

The application provides a simple interface to manage student records and perform CRUD operations.
## 🚀 Live Demo

[Open Live Student Management System](https://student-management-system-production-916d.up.railway.app)
## 🚀 Project Highlights

- Built a full-stack Student Management System using Java and Spring Boot.
- Developed REST APIs for creating, viewing, updating, and deleting student records.
- Integrated PostgreSQL database using Spring Data JPA and Hibernate.
- Built a responsive frontend using HTML, CSS, and JavaScript.
- Implemented input validation for student name, email, phone number, course, department, and marks.
- Added dashboard statistics including total students, average marks, and highest marks.
- Tested REST APIs using Postman.
- Containerized the application using Docker.
- Deployed the application on Railway with a live public URL.
## Features

- Add new students
- View all students
- Search students
- Update student details
- Delete students
- Calculate total students
- Calculate average marks
- Display highest marks
- Form validation
- RESTful APIs
- PostgreSQL database integration
- Responsive user interface

## Technologies Used

### Backend
- Java
- Spring Boot
- Spring Data JPA
- REST API
- Maven

### Frontend
- HTML
- CSS
- JavaScript

### Database
- PostgreSQL

### Tools
- Eclipse / Spring Tools
- Postman
- Git
- GitHub

## Project Structure

```text
student-management-system
│
├── src
│   └── main
│       ├── java
│       │   └── student_management_system
│       │       ├── controller
│       │       ├── entity
│       │       ├── repository
│       │       └── service
│       │
│       └── resources
│           ├── static
│           │   ├── css
│           │   ├── js
│           │   └── index.html
│           └── application.properties
│
├── screenshots
│   ├── dashboard.png
│   ├── student-list.png
│   └── edit-student.png
│
├── pom.xml
├── README.md
├── HELP.md
└── .gitignore
