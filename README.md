# 📅 Event & Task Management System (MERN Stack) — Practical 6, 7 & 8

A complete, modular full-stack application built with **React (Vite), Node.js, Express, MongoDB (Mongoose), and JWT Authentication** for the **Advanced Web Development Frameworks (AWDF)** practical syllabus.

> **✅ Status: Practical 6, 7 & 8 Performed & Verified**
>
> * **Practical 6:** Full-stack CRUD operations and MERN architecture
> * **Practical 7:** JWT Authentication, Protected Routes, Input Validation, User Model, Login/Register, and Logout
> * **Practical 8:** React Performance Optimization using `React.lazy()`, `Suspense`, and route-based code splitting

---

## 📑 Table of Contents

* [Practical 8 Performed Overview](#-practical-8-performed-overview)
* [Practical 7 Performed Overview](#-practical-7-performed-overview)
* [Practical 6 Performed Overview](#-practical-6-performed-overview)
* [Tech Stack](#-tech-stack)
* [Project Architecture & Auth Pipeline](#-project-architecture--auth-pipeline)
* [Performance Optimization Architecture](#-performance-optimization-architecture)
* [Folder Structure](#-folder-structure)
* [Practical Syllabus Mapping](#-practical-syllabus-mapping)
* [Getting Started](#-getting-started)

  * [Prerequisites](#prerequisites)
  * [1. Backend Setup](#1-backend-setup)
  * [2. Frontend Setup](#2-frontend-setup)
* [Performance Testing](#-performance-testing)
* [Before & After Comparison](#-before--after-comparison)
* [API Endpoints Reference](#-api-endpoints-reference)
* [Testing Authentication Endpoints](#-testing-authentication-endpoints)
* [License](#-license)

---

# ⚡ Practical 8 Performed Overview

## Performance Optimization and Lazy Loading in React

In **Practical 8**, the React frontend was optimized using **route-based lazy loading and code splitting**.

The objective was to reduce the amount of JavaScript required during the initial page load and load route-specific components only when the user visits the corresponding route.

### Technologies Used

* React `lazy()`
* React `Suspense`
* Dynamic `import()`
* Vite code splitting
* Chrome Developer Tools
* Network tab
* Network throttling using Slow 3G

---

## 🚀 Lazy Loading Implementation

The route components are loaded dynamically using `React.lazy()`.

Example:

```jsx
const Home = lazy(() => import("./pages/Home"));
const Events = lazy(() => import("./pages/Events"));
const EventDetails = lazy(() => import("./pages/EventDetails"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
```

Admin pages are also lazy-loaded:

```jsx
const AdminDashboard = lazy(() =>
  import("./pages/admin/AdminDashboard")
);

const ManageEvents = lazy(() =>
  import("./pages/admin/ManageEvents")
);
```

This allows Vite to create separate JavaScript chunks for these pages.

---

## ⏳ Suspense Fallback

`Suspense` is used to display a loading message while the required lazy-loaded component is being downloaded.

```jsx
<Suspense fallback={<LoadingPage />}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/events" element={<Events />} />
    <Route path="/events/:id" element={<EventDetails />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
</Suspense>
```

The application displays:

```text
Loading page...
```

while the required JavaScript chunk is loading.

---

## 📦 Lazy-Loaded Routes

The following route components were converted to lazy-loaded components:

| Route           | Component      | Lazy Loaded |
| :-------------- | :------------- | :---------: |
| `/`             | Home           |      ✅      |
| `/events`       | Events         |      ✅      |
| `/events/:id`   | EventDetails   |      ✅      |
| `/about`        | About          |      ✅      |
| `/contact`      | Contact        |      ✅      |
| `/admin`        | AdminDashboard |      ✅      |
| `/admin/events` | ManageEvents   |      ✅      |
| `*`             | NotFound       |      ✅      |

The authentication component remains normally imported because it is a shared authentication component:

```jsx
import Auth from "./components/Auth";
```

---

# 🏗 Performance Optimization Architecture

### Before Optimization

All route components were statically imported:

```text
                    React Application
                           |
                           ▼
                     Main Bundle
                           |
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
        Home            Events           Contact
          |                |                |
          └────────────────┴────────────────┘
                   Loaded initially
```

This can result in more JavaScript being required during the initial application load.

---

### After Optimization

Route components are dynamically imported:

```text
                    React Application
                           |
                           ▼
                     Main Bundle
                           |
                           ▼
                     Initial Page
                           |
                ┌──────────┴──────────┐
                │                     │
             /events              /contact
                │                     │
                ▼                     ▼
         Events Chunk          Contact Chunk
```

Only the JavaScript required for the current route is loaded initially. Other route chunks can be requested when their routes are visited.

---

# 🔍 How Lazy Loading Works

The application uses:

```jsx
lazy(() => import("./pages/Events"))
```

instead of:

```jsx
import Events from "./pages/Events";
```

When the user visits `/events`, the browser requests the corresponding JavaScript chunk.

Conceptually:

```text
User opens /
      ↓
Initial JavaScript loaded
      ↓
User clicks Events
      ↓
Events chunk requested
      ↓
Suspense displays loading UI
      ↓
Events component loaded
      ↓
Events page displayed
```

---

# 🧪 Performance Testing

Performance was tested using **Chrome Developer Tools**.

## 1. Build the application

Run:

```bash
npm run build
```

The Vite build output is used to compare the generated JavaScript bundles before and after optimization.

---

## 2. Open Chrome DevTools

Open the application and press:

```text
Ctrl + Shift + I
```

Open:

```text
Network
```

Then select:

```text
JS
```

Enable:

```text
Disable cache
```

Reload the application.

---

## 3. Test Lazy Loading

Use the Network throttling option:

```text
Slow 3G
```

Then reload the application.

Visit:

```text
/events
```

A separate JavaScript chunk for the Events page should be requested.

Similarly, visit:

```text
/contact
```

and observe the Contact JavaScript chunk.

---

## 4. Expected Network Behavior

Initial page:

```text
Initial JavaScript
      ↓
Home page
```

After navigating to Events:

```text
Initial JavaScript
      +
Events chunk
```

After navigating to Contact:

```text
Initial JavaScript
      +
Contact chunk
```

The exact generated chunk filenames depend on the Vite build.

---

# 📊 Before & After Comparison

Performance measurements should be recorded using the actual values obtained from the application and Chrome Developer Tools.

| Metric                 | Before Optimization | After Optimization |
| :--------------------- | :-----------------: | :----------------: |
| Initial JS Bundle      |   `[Enter value]`   |   `[Enter value]`  |
| Initial JS Transferred |   `[Enter value]`   |   `[Enter value]`  |
| Initial Load Time      |   `[Enter value]`   |   `[Enter value]`  |
| Route Chunks           |   `[Enter value]`   |   `[Enter value]`  |
| Projects/Events Chunk  |    Not separated    |   Separate chunk   |
| Contact Chunk          |    Not separated    |   Separate chunk   |

> **Note:** Replace the `[Enter value]` fields with the actual measurements obtained during the practical.

---

# 📸 Practical 8 Evidence

The following screenshots should be included in the repository or a `docs`/`screenshots` folder.

Recommended files:

```text
screenshots/
├── before-build.png
├── before-network.png
├── after-build.png
├── events-chunk.png
└── contact-chunk.png
```

### Screenshot 1 — Before Build

Shows the output of:

```bash
npm run build
```

before lazy loading was implemented.

### Screenshot 2 — Before Network

Chrome DevTools Network tab showing the initial JavaScript loading before optimization.

### Screenshot 3 — After Build

Shows the Vite build output after implementing lazy loading and code splitting.

### Screenshot 4 — Events Chunk

Chrome DevTools Network tab showing the Events JavaScript chunk being requested when `/events` is visited.

### Screenshot 5 — Contact Chunk

Chrome DevTools Network tab showing the Contact JavaScript chunk being requested when `/contact` is visited.

---

# 🧠 Key Concepts

### What is Lazy Loading?

Lazy loading means loading a component only when it is required instead of loading all application components at the beginning.

### What is Code Splitting?

Code splitting divides a large JavaScript bundle into smaller chunks that can be loaded independently.

### Why use `React.lazy()`?

`React.lazy()` allows React components to be loaded dynamically using JavaScript dynamic imports.

### Why use `Suspense`?

`Suspense` provides a fallback UI while a lazy-loaded component is being downloaded.

### Does lazy loading reduce total JavaScript?

Lazy loading primarily reduces the JavaScript required during the **initial load**. Other chunks can be downloaded later when their corresponding routes are visited.

### When may lazy loading not be useful?

For a very small application with a small JavaScript bundle, lazy loading may add complexity without providing a significant performance benefit.

---

# 🔐 Practical 7 Performed Overview

In **Practical 7**, end-to-end security, user management, and authentication layers were implemented across backend and frontend:

## Backend Implementation

1. **User Model & Schema (`backend/models/User.js`)**

   * `email` (String, required, unique, trimmed)
   * `password` (String, hashed with `bcryptjs` salt rounds = 10)
   * `timestamps` (`createdAt`, `updatedAt`)

2. **Authentication Routes (`authRoutes.js`)**

   * `POST /api/auth/register` — Validates input, hashes password, saves user
   * `POST /api/auth/login` — Verifies password hash and issues signed JWT token
   * `GET /api/auth/me` — Protected endpoint returning logged-in user profile

3. **Authentication Middleware (`authMiddleware.js`)**

   * Extracts `Bearer <token>` from the `Authorization` header
   * Verifies JWT using `process.env.JWT_SECRET`
   * Attaches decoded user information to `req.user`
   * Rejects unauthorized requests with `401 Unauthorized`

4. **Validation Middleware (`validateTask.js`)**

   * Validates mandatory fields before processing requests

5. **Protected Route Pipeline**

```text
Client Request
      ↓
authMiddleware
      ↓
JWT Check
      ↓
validateTask
      ↓
Controller / Database
```

## Frontend Implementation

1. **Auth Component (`Auth.jsx`)**

   * Login and Registration forms
   * Stores issued token in `localStorage`
   * Displays error/success messages

2. **Central API Client (`api.js`)**

   * Attaches Bearer token to protected requests
   * Handles `401 Unauthorized` responses

3. **Navbar and Logout**

   * Displays Logout when authenticated
   * Displays Login when unauthenticated

4. **Routing**

   * `/login`
   * `/auth`

---

# 📅 Practical 6 Performed Overview

In **Practical 6**, the generic full-stack template was adapted into an **Event Management System**:

* **Backend Model (`Event.js`)**: `title`, `description`, `eventDate`, `location`, `category`, `status`, `createdAt`
* **Backend REST API (`eventRoutes.js`)**: Full CRUD operations
* **Frontend Components**:

  * `EventCard.jsx`
  * `EventForm.jsx`
  * `Events.jsx`
  * `EventDetails.jsx`
  * `ManageEvents.jsx`
  * `AdminDashboard.jsx`
* Multi-page routing using React Router DOM
* MongoDB persistence using Mongoose

---

# 🛠 Tech Stack

## Frontend

* **React (Vite)** — Fast functional UI components and state management
* **React Router DOM** — Client-side routing
* **React.lazy()** — Lazy loading of route components
* **React Suspense** — Loading fallback for lazy components
* **Dynamic `import()`** — Route-based code splitting
* **Fetch API** — Native asynchronous HTTP client
* **Pure CSS** — Responsive styling

## Backend

* **Node.js** — JavaScript runtime
* **Express.js** — REST API framework
* **MongoDB & Mongoose** — Database and ODM
* **bcryptjs** — Password hashing
* **jsonwebtoken (JWT)** — Token-based authentication
* **dotenv** — Environment configuration
* **cors** — Cross-Origin Resource Sharing

## Development & Testing

* **VS Code**
* **Chrome Developer Tools**
* **Network Tab**
* **Performance Tab**
* **Vite Build Tool**
* **Slow 3G Network Throttling**

---

# 🏛 Project Architecture & Auth Pipeline

```text
┌────────────────────────────────────────────────────────┐
│               1. Presentation Layer                    │
│             React Frontend (Vite)                      │
│             http://localhost:5173                      │
│                                                        │
│  - User Interface, Pages & Admin Dashboard             │
│  - React Router                                        │
│  - Lazy Loading & Code Splitting                       │
│  - Suspense Loading UI                                 │
│  - Authentication                                      │
└──────────────────────────┬─────────────────────────────┘
                           │
                           │ HTTP Requests
                           │ Authorization: Bearer <JWT>
                           ▼
┌────────────────────────────────────────────────────────┐
│                2. Application Layer                    │
│               Express.js REST API                      │
│             http://localhost:5000                      │
│                                                        │
│  - Authentication Routes                               │
│  - JWT Middleware                                      │
│  - Validation Middleware                               │
│  - Events & Tasks REST APIs                            │
└──────────────────────────┬─────────────────────────────┘
                           │
                           │ Mongoose Queries
                           ▼
┌────────────────────────────────────────────────────────┐
│                  3. Data Layer                         │
│                MongoDB Database                        │
│             mongodb://127.0.0.1:27017                  │
│                                                        │
│  - users collection                                    │
│  - events collection                                   │
└────────────────────────────────────────────────────────┘
```

---

# 📂 Folder Structure

```text
PRA_6/
├── backend/
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   └── validateTask.js
│   ├── models/
│   │   ├── Event.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   └── taskRoutes.js
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   ├── EventCard.jsx
│   │   │   ├── EventForm.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   └── ManageEvents.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── EventDetails.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── Home.jsx
│   │   │   └── NotFound.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── screenshots/
│   ├── before-build.png
│   ├── before-network.png
│   ├── after-build.png
│   ├── events-chunk.png
│   └── contact-chunk.png
│
└── README.md
```

---

# 🎓 Practical Syllabus Mapping

| Practical       | Covered Concepts                                                                                                                                    |
| :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Practical 1** | React with Vite, Functional Components, Component Composition, Props, Reusable UI                                                                   |
| **Practical 2** | React Router DOM, `BrowserRouter`, `Routes`, `Route`, `NavLink`, `useState`, Controlled Forms                                                       |
| **Practical 3** | `useEffect`, Fetch API, Loading and Error States                                                                                                    |
| **Practical 4** | Express Server, RESTful CRUD APIs, Logger and Error Handler Middleware                                                                              |
| **Practical 5** | MongoDB, Mongoose Schemas, Validation and Database CRUD                                                                                             |
| **Practical 6** | Full-stack MERN Integration, CORS, Database Persistence                                                                                             |
| **Practical 7** | Authentication and Security, `bcryptjs`, JWT, Protected Routes, Middleware, User Model, Login/Register/Logout                                       |
| **Practical 8** | **Performance Optimization, `React.lazy()`, `Suspense`, Dynamic Imports, Route-based Code Splitting, Vite Chunks, Chrome DevTools Network Testing** |

---

# 🚀 Getting Started

## Prerequisites

* Node.js v18+
* MongoDB running locally
* npm

MongoDB:

```text
mongodb://127.0.0.1:27017
```

---

## 1. Backend Setup

```bash
cd backend
npm install
npm run dev
```

Ensure `backend/.env` contains:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/management_system_db
JWT_SECRET=my_super_secret_key_12345
```

---

## 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

---

# 📦 Production Build

To generate the optimized production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

The Vite build output can be checked to verify that route-based JavaScript chunks have been generated.

---

# 📡 API Endpoints Reference

## 🔐 Authentication Endpoints

| HTTP Method | Route                | Description                 | Headers / Auth                  |
| :---------- | :------------------- | :-------------------------- | :------------------------------ |
| **POST**    | `/api/auth/register` | Register new user           | None                            |
| **POST**    | `/api/auth/login`    | Login and receive JWT       | None                            |
| **GET**     | `/api/auth/me`       | Retrieve authenticated user | `Authorization: Bearer <token>` |

## 📅 Events Endpoints

| HTTP Method | Route             | Description           | Auth Required |
| :---------- | :---------------- | :-------------------- | :------------ |
| **GET**     | `/api/events`     | Retrieve all events   | No            |
| **GET**     | `/api/events/:id` | Retrieve single event | No            |
| **POST**    | `/api/events`     | Create a new event    | **Yes**       |
| **PUT**     | `/api/events/:id` | Update event          | **Yes**       |
| **DELETE**  | `/api/events/:id` | Delete event          | **Yes**       |

---

# 🧪 Testing Authentication Endpoints

## 1. Register a User

**POST**

```text
http://localhost:5000/api/auth/register
```

Body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

## 2. Login

**POST**

```text
http://localhost:5000/api/auth/login
```

Body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Example response:

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 3. Access Protected Profile

**GET**

```text
http://localhost:5000/api/auth/me
```

Header:

```text
Authorization: Bearer <YOUR_JWT_TOKEN>
```

---

## 📄 License
This project is open-source and intended for educational purposes.
