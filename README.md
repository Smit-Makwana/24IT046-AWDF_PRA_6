# Event Management System

A full-stack web application developed as part of **Advanced Web Development Frameworks (ITUE301)**. The project covers React component architecture, RESTful API development, MongoDB integration, authentication, performance optimization, asynchronous processing, and containerization using Docker.

## Project Overview

The Event Management System provides a platform to manage events, organize event information, and allow users to interact with event listings. The application follows a full-stack architecture with React on the frontend, Node.js and Express on the backend, and MongoDB as the database.

The project is developed incrementally across 11 weeks of practical work, with each week introducing and integrating new web development concepts.

## Objectives

- Build a responsive and component-based React frontend.
- Implement RESTful APIs using Node.js and Express.
- Store and manage event information using MongoDB and Mongoose.
- Integrate the frontend and backend through HTTP APIs.
- Implement authentication and middleware.
- Optimize frontend rendering and database queries.
- Explore in-memory caching and event-driven asynchronous processing.
- Containerize the application using Docker and Docker Compose.

## Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| React Router | Client-side routing |
| Node.js | Backend JavaScript runtime |
| Express.js | REST API and middleware |
| MongoDB | Database for event information |
| Mongoose | MongoDB schema design and data modeling |
| JWT / Authentication | User authentication, if implemented |
| Node.js Events / Async Processing | Event-driven processing, if implemented |
| Docker | Application containerization |
| Docker Compose | Multi-container orchestration |
| Git and GitHub | Version control and repository hosting |

## Main Features

The intended application features include:

- Event listing and event detail views.
- Create, view, update, and delete events.
- Event information such as title, description, date, time, venue, and category.
- Navigation between application pages.
- Backend REST API integration.
- MongoDB persistence.
- User authentication and protected routes, if implemented.
- Performance improvements through lazy loading and query optimization.
- Containerized frontend, backend, and database services.

*Note: Features should be marked as completed only when they have been implemented and tested in the application.*

## Project Structure

```text
event-management-system/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   ├── Dockerfile
│   └── .dockerignore
├── docker-compose.yml
├── .gitignore
└── README.md
```

The directory structure is a recommended layout and can be adjusted to match the actual project.

## Weekly Practical Implementation

### Week 1: Introduction to React and Component Architecture — CO1

- Set up the React development environment.
- Understand JSX and functional components.
- Build reusable components for event cards, headers, navigation, and event details.
- Organize the frontend using a component-based architecture.

### Week 2: State Management and Routing in React — CO1

- Manage event data and UI state using React hooks.
- Use `useState` and `useEffect` where appropriate.
- Implement page navigation using React Router.
- Create routes for the event listing, event details, and event creation pages.

### Week 3: API Integration and Data Rendering in React — CO1

- Fetch event data from backend APIs.
- Render event lists dynamically.
- Handle loading states and API errors.
- Integrate frontend forms with API requests.

### Week 4: Building a RESTful API with Node.js and Express — CO2

- Set up the Node.js and Express backend.
- Create REST endpoints for event management.
- Implement CRUD operations.
- Handle HTTP methods, status codes, request bodies, and errors.

### Week 5: MongoDB Integration and Schema Design with Mongoose — CO2, CO3

- Connect the backend to MongoDB.
- Design Mongoose schemas for event records.
- Validate event data.
- Store, retrieve, update, and delete event information.

### Week 6: Full Stack Integration — React + Node + MongoDB — CO1, CO2

- Connect the React frontend to the Express API.
- Integrate API endpoints with event forms and listing pages.
- Verify that changes persist in MongoDB.
- Test complete event management workflows.

### Week 7: Authentication and Middleware Pipeline — CO2, CO6

- Understand Express middleware.
- Implement authentication if required by the application.
- Validate incoming requests.
- Protect restricted routes and handle authentication errors.

### Week 8: Performance Optimization and Lazy Loading in React — CO1

- Identify components that can be loaded lazily.
- Use `React.lazy` and `Suspense` where appropriate.
- Reduce unnecessary rendering.
- Improve the initial loading experience.

### Week 9: In-Memory Caching and Query Optimization — CO2, CO4

- Explore caching frequently requested event data.
- Optimize MongoDB queries.
- Use suitable indexes for commonly queried fields.
- Compare API performance before and after optimization.

### Week 10: Asynchronous Processing with Event-Driven Architecture — CO4

- Understand asynchronous processing in Node.js.
- Explore event-driven communication and event listeners.
- Separate selected background tasks from request handling.
- Implement event notifications or background processing if included in the project.

### Week 11: Containerization with Docker and Docker Compose — CO5

- Create a Dockerfile for the React frontend.
- Create a Dockerfile for the Node.js and Express backend.
- Configure MongoDB using the official MongoDB image.
- Define frontend, backend, and database services in `docker-compose.yml`.
- Configure service networking, port mappings, and a named MongoDB volume.
- Run the full application using a single Docker Compose command.

## Installation and Setup

### Prerequisites

- Node.js and npm for local development.
- MongoDB, locally or through a configured database service.
- Git.
- Docker Desktop or Docker Engine with Docker Compose for containerized execution.

### Option 1: Run Locally

**1. Clone the repository**

```bash
git clone https://github.com/Smit-Makwana/24IT046-AWDF_PRA_6.git
cd event-management-system
```

**2. Install backend dependencies**

```bash
cd backend
npm install
```

**3. Configure backend environment variables**

Create a `.env` file in the backend directory with the variables required by your application. For example:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/eventdb
```

Add other required variables, such as an authentication secret, if your application uses them. Never commit real secrets to GitHub.

**4. Start the backend**

```bash
npm start
```

Use `npm run dev` instead if your project defines a development script.

**5. Install and start the frontend**

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

For a Vite frontend, the application is commonly available at `http://localhost:5173`.

Ensure that the frontend API base URL matches the backend address and that the required CORS settings are configured.

### Option 2: Run with Docker Compose

Ensure that the root `docker-compose.yml` defines the frontend, backend, and MongoDB services and that the backend uses the MongoDB Compose service name in its connection string.

From the project root, run:

```bash
docker compose up --build
```

Open the frontend at:

`http://localhost:5173`

The backend is available at:

`http://localhost:5000`

The exact endpoints depend on the routes implemented in the project.

To check running services:

```bash
docker compose ps
```

To view service logs:

```bash
docker compose logs
```

To stop the services:

```bash
docker compose down
```

A named MongoDB volume should be configured in Compose to preserve event data across normal container restarts and recreation. Avoid removing the volume when you need to retain database contents.

## Example REST API Endpoints

The following is a suggested API design. Adjust the endpoints to match the actual Express routes.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/events` | Retrieve all events |
| GET | `/api/events/:id` | Retrieve an event by ID |
| POST | `/api/events` | Create a new event |
| PUT | `/api/events/:id` | Update an event |
| DELETE | `/api/events/:id` | Delete an event |

Authentication endpoints may also be added if user registration and login are implemented.

## Testing and Verification

Verify the following during development:

1. React pages and navigation work correctly.
2. Event data is rendered from the API.
3. The REST API returns appropriate responses.
4. MongoDB stores and retrieves event records.
5. Event creation, updating, and deletion work end-to-end.
6. Authentication and authorization work if implemented.
7. Loading states and errors are handled.
8. Caching and database optimizations behave as intended.
9. Docker Compose starts all required services.
10. Event data persists after containers are stopped and recreated.

## Learning Outcomes

Upon completion, the project demonstrates the ability to:

- Develop component-based React applications.
- Manage frontend state and routing.
- Build RESTful APIs with Express.
- Design MongoDB schemas using Mongoose.
- Integrate frontend, backend, and database services.
- Understand middleware, authentication, and asynchronous processing.
- Apply frontend and database performance optimizations.
- Containerize and orchestrate a full-stack application with Docker Compose.

## Course Information

- **Course:** Advanced Web Development Frameworks
- **Course Code:** ITUE301
- **Project:** Event Management System
- **Practical Coverage:** Weeks 1–11
- **Repository:** https://github.com/Smit-Makwana/24IT046-AWDF_PRA_6.git

## Author

**Student Name:** Smit Makwana 
**Enrollment Number:** 24IT046
**Department / Institution:** IT/ CSPIT

## License

This project was developed for academic and educational purposes.


