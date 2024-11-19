const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require("body-parser");
const todoRoutes = require('./routes/todoRoutes')
require('dotenv').config();
const app = express(); //create an instance of express called app
const port = 5000;



// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL,
     { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


// Routes
app.use("/todos", todoRoutes);

// Start server
app.listen(port,()=>{
  console.log(`Server is listening on ${port} ` )
})