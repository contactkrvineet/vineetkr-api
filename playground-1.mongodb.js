// MongoDB Playground
// Select the database
use("vineetkr_db");

// Insert a new user
db.users.insertOne({
  name: "VineetTestnew",
  email: "Vineet@vineetkr.com",
  age: 25,
  createdAt: new Date(),
  updatedAt: new Date(),
});

// View all users
// db.users.find({});
