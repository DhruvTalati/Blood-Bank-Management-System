# 🩸 Blood Bank Management System

A full-stack **Blood Bank Management System** built using the **MERN Stack (MongoDB, Express.js, React.js, and Node.js)**. The application provides a centralized platform for managing blood donors, blood inventory, blood requests, users, and administrative operations through a responsive and user-friendly interface.

<p align="center">
  <a href="https://blood-bank-management-system-kohl.vercel.app/login">
    <strong>🌐 Live Demo</strong>
  </a>
</p>

---

## 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Application Modules](#-application-modules)
- [Technology Stack](#-technology-stack)
- [Project Architecture](#-project-architecture)
- [Application Workflows](#-application-workflows)
- [Database Structure](#-database-structure)
- [REST API Documentation](#-rest-api-documentation)
- [Project Structure](#-project-structure)
- [Installation and Setup](#-installation-and-setup)
- [Environment Variables](#-environment-variables)
- [Security](#-security)
- [Responsive Design and UI/UX](#-responsive-design-and-uiux)
- [Future Enhancements](#-future-enhancements)
- [Project Outcome](#-project-outcome)
- [Internship Details](#-internship-details)
- [Author](#-author)

---

## 📖 Project Overview

The Blood Bank Management System is a web-based application developed to simplify and organize blood bank operations through a centralized digital platform.

The system enables administrators to manage donor information, monitor blood availability, process blood requests, maintain user accounts, and access important operational statistics.

It integrates reusable React components, RESTful APIs, JWT-based authentication, MongoDB database management, and responsive UI design to deliver a structured full-stack application.

The primary goal is to improve the efficiency of blood bank administration by providing an organized approach to donor management, inventory tracking, and blood request processing.

## ✨ Key Features

- **Secure Authentication:** JWT-based authentication with protected routes and administrator access control.
- **Donor Management:** Complete CRUD operations for managing donor records.
- **Blood Inventory:** Blood-group-wise inventory tracking and availability monitoring.
- **Request Processing:** Create, review, approve, reject, and manage blood requests.
- **Automatic Inventory Updates:** Deduct available blood units when a request is successfully approved.
- **User Management:** Administrative management of system users and their roles.
- **Interactive Dashboard:** Overview of donors, inventory, requests, and recent activity.
- **Reports:** Summarized information about blood inventory, donors, and requests.
- **Profile Management:** View and update administrator profile information.
- **Application Settings:** Theme preferences, notification settings, and application-level configurations.
- **Reusable Components:** Structured and reusable form elements for consistent UI development.
- **Responsive Interface:** Optimized layouts for desktop, laptop, tablet, and mobile devices.

---

## 🧩 Application Modules

### 1. Authentication and Authorization

Provides secure access to the administrative application.

Features:
- Administrator login and registration.
- JWT-based authentication.
- Protected frontend routes.
- Protected backend API endpoints.
- Password hashing using bcrypt.
- Authentication token storage.
- Login form validation.
- Logout functionality.
- Role-based administrator access.
- Forgot password interface.

### 2. Donor Management

Allows administrators to maintain and manage donor information.

Features:
- Add new donors.
- View all donor records.
- Update donor information.
- Delete donor records.
- Search donor records.
- Select blood groups.
- Validate personal information.
- Validate mobile numbers and email addresses.
- Validate dates.
- Form reset functionality.
- Success and error notifications.

### 3. Blood Group Management

Supports all eight major blood groups:

| Blood Group |
|---|
| A+ |
| A- |
| B+ |
| B- |
| AB+ |
| AB- |
| O+ |
| O- |

A reusable blood-group dropdown component is implemented to maintain consistency across donor, inventory, and blood request forms.

### 4. Blood Inventory Management

Maintains blood availability according to individual blood groups.

Features:
- View available blood units.
- Group-wise inventory tracking.
- Update inventory quantities.
- Display last updated information.
- Availability indicators.
- Low-stock identification.
- Backend inventory persistence.
- Automatic inventory deduction after successful request approval.

### 5. Blood Request Management

Allows administrators to manage blood requests received from hospitals or patients.

Features:
- Create blood requests.
- View request records.
- Generate and display request IDs.
- Maintain hospital and patient information.
- Record patient age and contact details.
- Select required blood group.
- Specify required blood units.
- Set urgency levels.
- Provide reasons for requests.
- Track pending requests.
- Approve or reject requests.
- Delete request records.

**Inventory Integration:** When a request is approved, the system checks the available inventory and deducts the required units from the corresponding blood group when sufficient stock is available.

### 6. User Management

Provides administrative control over registered system users.

Features:
- View user records.
- Add new users.
- Edit user information.
- Delete users.
- Manage user roles.
- Validate email addresses.
- Hash passwords using bcrypt.
- Check for duplicate email addresses.
- Protect administrative operations.
- Prevent administrator self-deletion.

### 7. Dashboard

Provides a centralized overview of blood bank operations.

Dashboard statistics include:
- Total registered donors.
- Blood inventory overview.
- Available blood groups.
- Pending blood requests.
- Approved blood requests.
- Recent activities.
- Inventory statistics.

### 8. Reports

Provides summarized information to help administrators review system operations.

Report information includes:
- Blood inventory summaries.
- Blood-group-wise availability.
- Donor records.
- Blood request records.
- Request status summaries.
- Overall system information.

### 9. Profile Management

Allows administrators to manage their account information.

Features:
- View profile information.
- Edit profile details.
- Update personal information.
- Save profile changes.
- Synchronize updated profile information across the interface.

### 10. Application Settings

Provides application-level preferences and configuration options.

Features:
- Dark mode.
- Notification preferences.
- System information.
- Reset settings.
- User interface preferences.

---

## 🛠️ Technology Stack

The project follows the MERN Stack architecture.

### Frontend

| Technology | Purpose |
|---|---|
| React.js | Component-based frontend development |
| JavaScript | Application logic |
| React Router DOM | Client-side navigation |
| Axios | HTTP requests and API integration |
| Bootstrap | Responsive UI components |
| Custom CSS | Styling and interface customization |
| HTML5 | Application structure |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Server-side JavaScript runtime |
| Express.js | REST API development |
| MongoDB | NoSQL database |
| Mongoose | Database schemas and data operations |
| JWT | Authentication and authorization |
| bcrypt | Password hashing |

### Development and Deployment Tools

| Tool | Purpose |
|---|---|
| Visual Studio Code | Development environment |
| Git | Version control |
| GitHub | Source code management |
| MongoDB Atlas | Cloud database hosting |
| npm | Package management |
| Vercel | Frontend deployment |
| Render | Backend deployment |

---

## 🏗️ Project Architecture

The application follows a client-server architecture.

```text
                 USER / ADMINISTRATOR
                         |
                         v
                REACT FRONTEND
                         |
              React Router / Axios
                         |
                         v
                  REST API REQUESTS
                         |
                         v
                 EXPRESS.JS SERVER
                         |
              Authentication Middleware
                         |
                         v
                  ROUTE HANDLERS
                         |
                         v
                  CONTROLLERS
                         |
                         v
                   MONGOOSE ODM
                         |
                         v
                   MONGODB DATABASE
```

### Architecture Explanation

1. The React frontend provides the user interface and handles user interactions.
2. Axios sends HTTP requests to the Express backend.
3. Express routes direct requests to their respective controllers.
4. Authentication middleware validates JWT tokens for protected operations.
5. Controllers process application logic and interact with MongoDB through Mongoose.
6. The backend returns structured JSON responses to the frontend.

---

## 🔄 Application Workflows

### 1. Authentication Workflow

```text
Administrator
      |
      v
   Login Form
      |
      v
POST /api/auth/login
      |
      v
 Express Backend
      |
      v
Verify Email and Password
      |
      v
Generate JWT Token
      |
      v
Return Authentication Response
      |
      v
React Frontend
      |
      v
Store Authentication Token
      |
      v
Access Protected Pages
```

### 2. Blood Request Approval Workflow

```text
Create Blood Request
         |
         v
   Pending Status
         |
         v
Administrator Reviews Request
         |
         v
   Approval Decision
      /       \
     /         \
 Approve      Reject
    |            |
    v            v
Check Stock   Rejected Status
    |
    v
Sufficient Inventory?
    |
    v
Deduct Required Units
    |
    v
Update Inventory
    |
    v
Approved Status
```

---

## 🗄️ Database Structure

**Database:** MongoDB

Mongoose is used for schema definition, data validation, and database interactions.

The primary collections include:

| Collection | Description |
|---|---|
| Users | Stores administrator and system user information |
| Donors | Stores donor personal and blood-group information |
| Inventory | Stores blood-group-wise inventory quantities |
| Blood Requests | Stores hospital/patient requests and their processing status |

### Database Operations

- Schema-based data modeling using Mongoose.
- Create, read, update, and delete operations.
- Data validation.
- Duplicate email checking.
- Authentication-related user data management.
- Inventory quantity updates.
- Request status management.

---

## 🔌 REST API Documentation

The backend exposes RESTful endpoints for the application's major modules.

**Base URL (Local):**

```text
http://localhost:5000/api
```

**Base URL (Production):**

```text
https://blood-bank-management-system-d2le.onrender.com/api
```

### Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a user |
| POST | `/auth/login` | Authenticate a user |
| GET | `/auth/me` | Retrieve authenticated user profile |
| PUT | `/auth/me` | Update authenticated user profile |

### Donor APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/donors` | Retrieve all donors |
| POST | `/donors` | Create a donor |
| GET | `/donors/:id` | Retrieve donor by ID |
| PUT | `/donors/:id` | Update donor information |
| DELETE | `/donors/:id` | Delete a donor |

### Inventory APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/inventory` | Retrieve blood inventory |
| POST | `/inventory/initialize` | Initialize inventory |
| PUT | `/inventory/:bloodGroup` | Update inventory for a blood group |

### Blood Request APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/requests` | Create a blood request |
| GET | `/requests` | Retrieve blood requests |
| GET | `/requests/:id` | Retrieve a request by ID |
| PUT | `/requests/:id/approve` | Approve a blood request |
| PUT | `/requests/:id/reject` | Reject a blood request |
| DELETE | `/requests/:id` | Delete a blood request |

### User APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/users` | Retrieve all users |
| GET | `/users/:id` | Retrieve a user by ID |
| POST | `/users` | Create a user |
| PUT | `/users/:id` | Update user information |
| DELETE | `/users/:id` | Delete a user |

**Note:** Protected endpoints require a valid authentication token in the Authorization header.

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## 📁 Project Structure

The project is organized into separate frontend and backend directories.

```text
BloodBank_MERN_Management_System/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FormInput.js
│   │   │   ├── BloodGroupDropdown.js
│   │   │   ├── PasswordInput.js
│   │   │   └── FormSection.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Donors.js
│   │   │   ├── Inventory.js
│   │   │   ├── Requests.js
│   │   │   └── Users.js
│   │   │
│   │   ├── services/
│   │   │   └── API configuration
│   │   │
│   │   ├── App.js
│   │   └── index.js
│   │
│   ├── .env
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── donorController.js
│   │   ├── inventoryController.js
│   │   ├── requestController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── donorRoutes.js
│   │   ├── inventoryRoutes.js
│   │   ├── requestRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

*Note: The structure above illustrates the major application directories and files. Individual filenames may vary depending on the implementation.*

---

## ⚙️ Installation and Setup

Follow these instructions to run the project locally.

### Prerequisites

Ensure the following tools are installed:

- Node.js
- npm
- MongoDB Atlas account or local MongoDB installation
- Git
- Visual Studio Code

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Navigate into the project directory:

```bash
cd BloodBank_MERN_Management_System
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

Open another terminal:

```bash
cd client
npm install
```

### 4. Configure Backend Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

Replace the placeholder values with your actual configuration.

### 5. Start the Backend Server

From the `server` directory:

```bash
npm start
```

If your backend package configuration uses a development script, you can also use:

```bash
npm run dev
```

The backend will normally run at:

```text
http://localhost:5000
```

### 6. Configure Frontend Environment Variables

Create a `.env` file inside the `client` directory.

```env
REACT_APP_API_URL=http://localhost:5000/api
```

For production deployment, configure the frontend API URL using your hosting provider's environment variable settings.

### 7. Start the Frontend

From the `client` directory:

```bash
npm start
```

The React application will normally run at:

```text
http://localhost:3000
```

---

## 🔐 Security

The application implements several security mechanisms to protect user accounts and administrative operations.

- JWT-based authentication.
- Protected frontend routes.
- Protected backend API endpoints.
- Administrator authorization.
- Password hashing using bcrypt.
- Authentication token validation.
- Duplicate email validation.
- Administrator self-deletion prevention.
- Environment-based configuration for sensitive credentials.

**Important:** MongoDB credentials, JWT secrets, and other private configuration values should be stored in backend environment variables and must never be committed to the public repository.

---

## 📱 Responsive Design and UI/UX

The application focuses on usability, consistency, and responsive interface design.

UI/UX features include:

- Responsive sidebar navigation.
- Clean dashboard layout.
- Reusable form components.
- Structured content sections.
- Consistent color scheme.
- Form validation and feedback.
- Success and error notifications.
- Password visibility controls.
- Dark mode support.
- Responsive forms and layouts.
- Interactive buttons.
- Protected navigation.
- User profile management.

The interface is designed to support desktop, laptop, tablet, and mobile screen sizes.

---

## 🚀 Future Enhancements

The following features can be considered for future development:

- Email-based password recovery.
- Email and SMS notifications.
- Dedicated hospital accounts.
- Donor registration and login portal.
- Blood donation appointment scheduling.
- Blood expiry date tracking.
- Advanced analytics and reporting.
- PDF report generation.
- Real-time notifications.
- Automated low-stock alerts.
- Enhanced role-based permissions.
- Advanced blood inventory management.

---

## 🎯 Project Outcome

The Blood Bank Management System demonstrates the practical implementation of full-stack web development using the MERN Stack.

The project combines:

- Component-based React development.
- RESTful API architecture.
- MongoDB database integration.
- JWT authentication and authorization.
- CRUD-based administrative modules.
- Reusable form components.
- Client-side validation.
- Responsive UI/UX design.
- Backend business logic.
- Inventory and request management.

It provides practical experience in developing, integrating, and deploying a complete web-based application using modern JavaScript technologies.

---

## 🎓 Internship Details

| Detail | Information |
|---|---|
| Internship Project | Blood Bank Management System |
| Institution | A. D. Patel Institute of Technology |
| Department | Information Technology |

---

## 👨‍💻 Author

**Dhruv Ashishbhai Talati**

- **GitHub:** https://github.com/DhruvTalati
- **Live Project:** [Blood Bank Management System](https://blood-bank-management-system-kohl.vercel.app/login)

---

<p align="center">
  <strong>🩸 Blood Bank Management System</strong>
  <br/>
  <em>Technology for better blood bank management.</em>
  <br/><br/>
  Developed with ❤️ using the MERN Stack.
</p>
