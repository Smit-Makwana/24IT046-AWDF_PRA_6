// src/api.js
// Practical Concept: Practical 3, Practical 6 & Practical 7
// Central file for Event & Auth API requests with JWT Authorization headers

const BASE_URL = "http://localhost:5000/api";

// Helper to get authorization headers with JWT token
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

// REGISTER USER
export async function registerUser(email, password) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }
  return data;
}

// LOGIN USER
export async function loginUser(email, password) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }
  return data;
}

// GET CURRENT LOGGED-IN USER PROFILE (/me)
export async function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const response = await fetch(`${BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to load user profile");
  }

  return response.json();
}

// GET ALL EVENTS (Public)
export async function getEvents() {
  const response = await fetch(`${BASE_URL}/events`);

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return response.json();
}

// GET ONE EVENT
export async function getEventById(id) {
  const response = await fetch(`${BASE_URL}/events/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }

  return response.json();
}

// CREATE EVENT (Protected with JWT)
export async function createEvent(eventData) {
  const response = await fetch(`${BASE_URL}/events`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(eventData),
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    throw new Error("Session expired or unauthorized. Please login first.");
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create event");
  }

  return response.json();
}

// UPDATE EVENT (Protected with JWT)
export async function updateEvent(id, eventData) {
  const response = await fetch(`${BASE_URL}/events/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(eventData),
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    throw new Error("Session expired or unauthorized. Please login first.");
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update event");
  }

  return response.json();
}

// DELETE EVENT (Protected with JWT)
export async function deleteEvent(id) {
  const response = await fetch(`${BASE_URL}/events/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    throw new Error("Session expired or unauthorized. Please login first.");
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete event");
  }

  return response.json();
}

// GENERATE AI DESCRIPTION (Practical 13)
export async function generateAiDescription(title, category) {
  const response = await fetch(`${BASE_URL}/ai/generate-description`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, category }),
  });

  const data = await response.json();
  if (!response.ok && response.status !== 429) {
    throw new Error(data.message || "Failed to generate AI description");
  }
  return data;
}

