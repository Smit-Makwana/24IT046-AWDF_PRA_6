// backend/routes/eventRoutes.js
// Practical Concept: Practical 4, Practical 5 & Practical 7
// REST API CRUD operations with Authentication & Validation Middlewares

const express = require("express");
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");
const validateTask = require("../middleware/validateTask");
const eventManager = require("../events");

const router = express.Router();


// GET all events
router.get("/", async (req, res, next) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    next(error);
  }
});


// GET one event by ID
router.get("/:id", async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
});


// POST create new event (Protected with authMiddleware & validateTask)
router.post("/", authMiddleware, validateTask, async (req, res, next) => {
  try {

    // Save event to MongoDB
    const event = await Event.create(req.body);

    console.log(
      `[API] Event created at ${new Date().toISOString()}`
    );

    // Send API response immediately
    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });

    // Emit event after sending response
    eventManager.emit("event-created", event);

  } catch (error) {
    next(error);
  }
});


// PUT update event (Protected with authMiddleware & validateTask)
router.put("/:id", authMiddleware, validateTask, async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    next(error);
  }
});


// DELETE event (Protected with authMiddleware)
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {

    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    console.log(
      `[API] Event deleted at ${new Date().toISOString()}`
    );

    // Send response immediately
    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });

    // Emit delete event
    eventManager.emit("event-deleted", event);

  } catch (error) {
    next(error);
  }
});

module.exports = router;
