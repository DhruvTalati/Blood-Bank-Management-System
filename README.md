# Blood Bank Management System

## Internship Project

**Internship:** Web Design With MERN Stack  
**Company:** Brainybeam Info-Tech Pvt. Ltd.  
**Student:** Dhruv Ashishbhai Talati  
**Enrollment No.:** 12302080601019  
**Duration:** 11 May 2026 – 9 June 2026

---

## Project Overview

The Blood Bank Management System is a web-based management application developed using the MERN Stack.

The system provides a centralized platform for managing blood donors, blood inventory, blood requests, users, and administrative activities. It combines reusable form components and modern UI/UX features into a single integrated application.

The application includes administrator authentication, donor management, blood inventory management, blood request processing, user management, dashboard statistics, reports, profile management, and application settings.

---

## Objectives

The main objectives of the project are:

- To develop a centralized Blood Bank Management System.
- To create reusable and structured form components.
- To provide a responsive and user-friendly interface.
- To manage donor information efficiently.
- To maintain blood-group-wise inventory.
- To manage and process blood requests.
- To provide secure administrator authentication.
- To implement JWT-based authentication.
- To store application data using MongoDB.
- To provide administrative user management.
- To provide dashboard statistics and reports.
- To improve usability through navigation, themes, validation, and feedback.

---

## Main Features

### 1. Authentication

- Administrator login
- JWT-based authentication
- Protected routes
- Password hashing using bcrypt
- Login validation
- Logout functionality
- Forgot Password interface
- Authentication token storage
- Role-based administrator access

### 2. Donor Management

The donor management module allows administrators to manage donor information.

Features include:

- Add new donor
- View donor records
- Edit donor information
- Delete donor records
- Search donor records
- Blood group selection
- Personal information validation
- Mobile number validation
- Email validation
- Date validation
- Form reset functionality
- Success and error feedback

### 3. Blood Group Management

The system supports all major blood groups:

- A+
- A-
- B+
- B-
- AB+
- AB-
- O+
- O-

A reusable blood-group selection component is used throughout the application.

### 4. Blood Inventory Management

The inventory module maintains blood availability according to blood group.

Features include:

- View available blood units
- Blood-group-wise inventory
- Update blood units
- Last updated information
- Inventory availability indicators
- Low-stock identification
- Backend inventory storage
- Automatic inventory deduction after approved requests

### 5. Blood Request Management

Administrators can manage blood requests received from hospitals or patients.

Features include:

- Create blood request
- View requests
- Request ID
- Hospital information
- Patient information
- Patient age
- Blood group
- Required units
- Urgency level
- Contact information
- Reason for request
- Pending status
- Approve request
- Reject request
- Delete request

When a request is approved, the required blood units are automatically deducted from the corresponding inventory.

### 6. User Management

The user management module allows administrators to manage system users.

Features include:

- View users
- Add users
- Edit users
- Delete users
- User role management
- Email validation
- Password hashing
- Duplicate email checking
- Protected administrator operations
- Prevention of administrator self-deletion

### 7. Dashboard

The dashboard provides an overview of the Blood Bank Management System.

It can display information such as:

- Total donors
- Blood inventory
- Available blood groups
- Pending requests
- Approved requests
- Recent activity
- Inventory statistics

The dashboard is designed to provide administrators with a quick overview of the system.

### 8. Reports

The reports module provides summarized information about the system.

It includes information related to:

- Blood inventory
- Blood groups
- Donor records
- Blood requests
- Request status
- Overall system data

### 9. Profile Management

Administrators can manage their profile information.

Features include:

- View profile
- Edit profile information
- Update profile details
- Save changes
- Profile information synchronization across the interface

### 10. Application Settings

The settings module provides application-level preferences.

Features include:

- Dark mode
- Notification preferences
- System information
- Reset settings
- User interface preferences

---

## Reusable UI Components

The project uses reusable components to improve consistency and maintainability.

### FormInput

A reusable input component for common form fields such as:

- Name
- Email
- Mobile number
- Date
- Text fields

### BloodGroupDropdown

A reusable dropdown component containing all supported blood groups.

### PasswordInput

A reusable password field with show/hide password functionality.

### FormSection

Used to organize related fields into structured sections.

---

## Validation

Client-side validation is implemented for important form fields.

Validation includes:

- Required field validation
- Email validation
- Mobile number validation
- Date validation
- Password validation
- Confirm password validation
- Blood group validation
- Consent/declaration validation

Validation feedback is displayed to help users correct invalid information before submission.

---

## Technology Stack

### Frontend

- React.js
- JavaScript
- React Router DOM
- Axios
- Bootstrap
- Custom CSS
- Responsive UI

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

### Development Tools

- Visual Studio Code
- Git
- GitHub
- MongoDB Atlas
- npm

---

## System Architecture

The application follows a client-server architecture based on the MERN Stack.

```text
                ┌──────────────────────┐
                │       React.js       │
                │      Frontend        │
                └──────────┬───────────┘
                           │
                           │ HTTP / REST API
                           ▼
                ┌──────────────────────┐
                │      Express.js      │
                │       Backend        │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │       MongoDB        │
                │       Database       │
                └──────────────────────┘
```

Project Structure
BloodBank_MERN_Management_System/

├── client/
│ ├── public/
│ └── src/
│ ├── api/
│ │ └── api.js
│ │
│ ├── components/
│ │ ├── BloodGroupDropdown.js
│ │ ├── FormInput.js
│ │ ├── FormSection.js
│ │ ├── PasswordInput.js
│ │ ├── ProtectedRoute.js
│ │ └── Sidebar.js
│ │
│ ├── pages/
│ │ ├── Login.js
│ │ ├── ForgotPassword.js
│ │ ├── Dashboard.js
│ │ ├── Donors.js
│ │ ├── Inventory.js
│ │ ├── Requests.js
│ │ ├── Users.js
│ │ ├── Reports.js
│ │ ├── Profile.js
│ │ └── Settings.js
│ │
│ ├── App.js
│ ├── index.js
│ └── styles.css
│
├── server/
│ ├── config/
│ │ └── db.js
│ │
│ ├── controllers/
│ │ ├── authController.js
│ │ ├── donorController.js
│ │ ├── inventoryController.js
│ │ ├── requestController.js
│ │ └── userController.js
│ │
│ ├── middleware/
│ │ ├── authMiddleware.js
│ │ └── adminMiddleware.js
│ │
│ ├── models/
│ │ ├── User.js
│ │ ├── Donor.js
│ │ ├── Inventory.js
│ │ └── BloodRequest.js
│ │
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── donorRoutes.js
│ │ ├── inventoryRoutes.js
│ │ ├── requestRoutes.js
│ │ └── userRoutes.js
│ │
│ ├── .env
│ ├── server.js
│ └── package.json
│
└── README.md
API Modules

The backend provides REST APIs for the following modules.

Authentication API
POST /api/auth/register
POST /api/auth/login
Donor API
GET /api/donors
POST /api/donors
GET /api/donors/:id
PUT /api/donors/:id
DELETE /api/donors/:id
Inventory API
GET /api/inventory
POST /api/inventory/initialize
PUT /api/inventory/:bloodGroup
Blood Request API
POST /api/requests
GET /api/requests
GET /api/requests/:id
PUT /api/requests/:id/approve
PUT /api/requests/:id/reject
DELETE /api/requests/:id
User API
GET /api/users
GET /api/users/:id
POST /api/users
PUT /api/users/:id
DELETE /api/users/:id
Authentication Flow
Administrator
│
▼
Login Form
│
▼
POST /api/auth/login
│
▼
Express Backend
│
▼
Verify Email & Password
│
▼
Generate JWT
│
▼
Return Token
│
▼
React Frontend
│
▼
Store Authentication Token
│
▼
Access Protected Pages
Blood Request Approval Flow
Create Request
│
▼
Pending
│
▼
Administrator Reviews
│
├───────────────┐
▼ ▼
Approve Reject
│ │
▼ ▼
Check Inventory Request Rejected
│
▼
Sufficient Units?
│
▼
Deduct Blood Units
│
▼
Request Approved
Database

MongoDB is used as the database for storing application information.

Main collections/models include:

Users
Donors
Inventory
Blood Requests

Mongoose is used for schema definition, validation, and database interaction.

Responsive Design

The application is designed to provide a usable experience across different screen sizes.

The UI supports:

Desktop screens
Laptop screens
Tablet screens
Mobile screens

Bootstrap and custom CSS are used together to create the responsive interface.

UI/UX Features

The application includes several UI and UX enhancements:

Responsive sidebar navigation
Clean dashboard layout
Reusable components
Form validation
Success/error feedback
Password visibility control
Dark mode
Responsive forms
Structured content sections
Interactive buttons
Consistent color scheme
User profile management
Protected navigation
How to Run the Project

1. Open the project

Open the BloodBank_MERN_Management_System folder in Visual Studio Code.

2. Install frontend dependencies
   cd client
   npm install
3. Install backend dependencies
   cd server
   npm install
4. Configure environment variables

Create a .env file inside the server folder.

Example:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret 5. Start the backend
cd server
node server.js

The backend normally runs on:

http://localhost:5000 6. Start the frontend

Open another terminal:

cd client
npm start

The frontend normally runs on:

http://localhost:3000
Application Flow
Login
│
▼
Dashboard
│
├── Donors
│
├── Inventory
│
├── Blood Requests
│
├── Users
│
├── Reports
│
├── Profile
│
└── Settings
Security

The application includes basic security mechanisms such as:

JWT authentication
Protected API routes
Administrator authorization
Password hashing using bcrypt
Authentication token validation
Duplicate email validation
Self-delete protection for administrator accounts

Sensitive configuration values such as MongoDB credentials and JWT secrets are maintained through environment variables.

Future Enhancements

Possible future improvements include:

Email-based password reset
Email/SMS notifications
Hospital accounts
Donor login portal
Blood donation appointment scheduling
Blood expiry tracking
Advanced analytics
PDF report generation
Cloud deployment
Role-based permissions for multiple administrator levels
Real-time notifications
Automated low-stock alerts
Project Outcome

The project demonstrates the development of an integrated web application using the MERN Stack.

It combines reusable form components, validation, responsive UI design, authentication, REST APIs, database integration, and administrative modules into a single Blood Bank Management System.

The project provides practical experience in frontend development, backend API development, database integration, authentication, REST API design, and full-stack web application development.

Author

Dhruv Ashishbhai Talati
Enrollment No.: 12302080601019
B.Tech – Information Technology
A. D. Patel Institute of Technology

Internship Details

Company: Brainybeam Info-Tech Pvt. Ltd.
Internship: Web Design With MERN Stack
Duration: 11 May 2026 – 9 June 2026
Industry Mentor: Mr. Sagar Jasani
Faculty Guide: Dr. Sheetal Gondaliya
