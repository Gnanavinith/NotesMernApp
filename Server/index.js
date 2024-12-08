// // index.js
// import express from 'express';
// import cors from 'cors';
// import authRouter from './routes/auth.js';  // Correct import with file extension
// import db from './db/database.js';  // Correct import with file extension
// import noteRouter from "./routes/note.js"



// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());  

// // Routes
// app.use("/api/auth", authRouter);
// app.use("/api/note",noteRouter);

// // Start the server
// app.listen(3000, () => {
//   db(); // Connect to DB
//   console.log('Server is running on port 3000');
// });


import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import noteRouter from "./routes/note.js";
import db from "./db/database.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

// Start the server
app.listen(3000, () => {
  db(); // Connect to DB
  console.log("Server is running on port 3000");
});

