// Import the built-in events module
const EventEmitter = require("events");

// Create an instance of EventEmitter
const eventBus = new EventEmitter();

// ---------------------------
// EVENT LISTENERS
// ---------------------------

// Multiple listeners for userLoggedIn
eventBus.on("userLoggedIn", (user) => {
  console.log(`> User ${user} logged in`);
});

eventBus.on("userLoggedIn", (user) => {
  console.log(`> Notification sent to ${user}`);
});

// Listener for messageReceived
eventBus.on("messageReceived", (user, message) => {
  console.log(`> New message for ${user}: "${message}"`);
});

// Listener for dataSynced
eventBus.on("dataSynced", (user) => {
  console.log(`> Data sync complete for ${user}`);
});

// ---------------------------
// SIMULATING ASYNC OPERATIONS
// ---------------------------

function simulateApp() {
  console.log("\nStarting Real-Time Notification System...\n");

  // Simulate user login after 1 second
  setTimeout(() => {
    eventBus.emit("userLoggedIn", "John");

    // After login, simulate receiving a message
    setTimeout(() => {
      eventBus.emit("messageReceived", "John", "Welcome to the platform!");

      // After message, simulate data syncing
      console.log("> Syncing user data...");
      setTimeout(() => {
        eventBus.emit("dataSynced", "John");
      }, 1500);
    }, 1000);
  }, 1000);
}

// Run the simulation
simulateApp();
