const eventManager = require("./events");

// ============================================
// EVENT CREATED LISTENER
// ============================================

eventManager.on("event-created", (event) => {

  console.log(
    `[Notification] Event "${event.title}" created at ${new Date().toISOString()}`
  );

  // Simulate slow background notification processing
  setTimeout(() => {

    console.log(
      `[Notification Completed] Event "${event.title}" processed at ${new Date().toISOString()}`
    );

    console.log(
      `[Notification] Location: ${event.location}`
    );

  }, 2000);

});


// ============================================
// EVENT DELETED LISTENER
// ============================================

eventManager.on("event-deleted", (event) => {

  console.log(
    `[Deleted Notification] Event "${event.title}" was deleted at ${new Date().toISOString()}`
  );

});


// ============================================
// ERROR LISTENER
// ============================================

eventManager.on("error", (error) => {

  console.error(
    `[Event Error] ${new Date().toISOString()} - ${error.message}`
  );

});