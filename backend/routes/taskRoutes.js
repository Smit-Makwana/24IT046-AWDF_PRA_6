// backend/routes/taskRoutes.js

// Practical 9 - In-Memory Caching and Query Optimization

const express = require("express");

const Event = require("../models/Event");

const authMiddleware = require("../middleware/authMiddleware");

const validateTask = require("../middleware/validateTask");

const cache = require("../cache");

const router = express.Router();


// ======================================================
// GET all tasks / events
// ======================================================

router.get("/", authMiddleware, async (req, res, next) => {

  try {

    // Check cache first
    const cachedTasks = cache.get("all_tasks");

    if (cachedTasks) {

      cache.incrementHit();

      console.log("CACHE HIT - Returning tasks from cache");

      return res.status(200).json({
        success: true,
        data: cachedTasks
      });
    }

    // Cache miss
    cache.incrementMiss();

    console.log("CACHE MISS - Fetching tasks from MongoDB");

    // Query MongoDB
    const tasks = await Event.find().sort({ createdAt: -1 });

    // Store result in cache
    cache.set("all_tasks", tasks);

    res.status(200).json({
      success: true,
      data: tasks
    });

  } catch (error) {

    next(error);

  }

});


// ======================================================
// GET one task by ID
// ======================================================

router.get("/:id", authMiddleware, async (req, res, next) => {

  try {

    const cacheKey = `task_${req.params.id}`;

    // Check single-task cache
    const cachedTask = cache.get(cacheKey);

    if (cachedTask) {

      cache.incrementHit();

      console.log("CACHE HIT - Returning single task from cache");

      return res.status(200).json({
        success: true,
        data: cachedTask
      });
    }

    // Cache miss
    cache.incrementMiss();

    console.log("CACHE MISS - Fetching single task from MongoDB");

    const task = await Event.findById(req.params.id);

    if (!task) {

      return res.status(404).json({
        success: false,
        message: "Task not found"
      });

    }

    // Store single task in cache
    cache.set(cacheKey, task);

    res.status(200).json({
      success: true,
      data: task
    });

  } catch (error) {

    next(error);

  }

});


// ======================================================
// POST create new task
// ======================================================

router.post("/", authMiddleware, validateTask, async (req, res, next) => {

  try {

    const task = await Event.create(req.body);

    // Invalidate all tasks cache
    cache.del("all_tasks");

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task
    });

  } catch (error) {

    next(error);

  }

});


// ======================================================
// PUT update task
// ======================================================

router.put("/:id", authMiddleware, validateTask, async (req, res, next) => {

  try {

    const task = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {

      return res.status(404).json({
        success: false,
        message: "Task not found"
      });

    }

    // Invalidate caches
    cache.del("all_tasks");
    cache.del(`task_${req.params.id}`);

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task
    });

  } catch (error) {

    next(error);

  }

});


// ======================================================
// DELETE task
// ======================================================

router.delete("/:id", authMiddleware, async (req, res, next) => {

  try {

    const task = await Event.findByIdAndDelete(req.params.id);

    if (!task) {

      return res.status(404).json({
        success: false,
        message: "Task not found"
      });

    }

    // Invalidate caches
    cache.del("all_tasks");
    cache.del(`task_${req.params.id}`);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    });

  } catch (error) {

    next(error);

  }

});


// ======================================================
// Cache Debug / Statistics
// ======================================================

router.get("/cache/stats", authMiddleware, (req, res) => {

  res.status(200).json({
    success: true,
    cache: cache.getStats()
  });

});


module.exports = router;