
# IT Support Ticket System

A full-stack web application for creating, managing, and tracking IT support tickets. Built using Spring Boot for the backend and vanilla JavaScript for the frontend.

This project was developed to demonstrate full-stack development skills, including REST API design, frontend/backend integration, and real-time UI updates.


## Overview

The application allows users to submit, update, and manage IT support tickets through a clean and responsive interface. All ticket operations are handled through a RESTful API and reflected instantly on the frontend without requiring a page refresh.
## Features

* Create, update, and delete support tickets (full CRUD)
* View all tickets dynamically with no page reload
* Edit mode with automatic form population
* Status and priority tracking with visual badge indicators 
* Form validation on both frontend and backend
* Error handling for failed API requests
* Delete confirmation to prevent accidental actions
* Auto-loading of tickets on page load
* Clean UI with structured layout and card-based design
## Tech Stack

**Backend:** 
* Java
* Spring Boot
* Spring Data JPA
* H2 (In-Memory) Database

**Frontend:**
* HTML
* CSS
* JavaScript (Vanilla)
## Architecture

The backend follows a layered architecture:

* Controller Layer: Handles HTTP requests and responses
* Service Layer: Contains business logic and validation
* Repository Layer: Handles database interaction using JPA

This separation of concerns improves maintainability and scalabitlity.
## How to Run

1. Clone the repository:  
`git clone (https://github.com/sebastian-kline/it-support-ticket-system)`
2. Open the project in your preferred IDE
3. Run the Spring Boot application
4. Open your browser and go to:
`http://localhost:8080`
## Key Concepts Demonstrated
* RESTful API development using Spring Boot
* Full CRUD operations (GET, POST, PUT, DELETE)
* Separation of concerns using Controller, Service, and Repository layers
* Frontend and backend communication using fetch API
* Asynchronous request handling in JavaScript
* UI state management (edit mode vs create mode)
* Form validation using HTML required and Spring @NotBlank
* Error handling for both frontend and backend
* Dynamic DOM manipulation
## Author

- [@sebastian-kline](https://github.com/sebastian-kline)

