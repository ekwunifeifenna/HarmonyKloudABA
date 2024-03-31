require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const corsMiddleware = require("./middlewares/cors");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const connectToDatabase = require("./db/mongoose");
const authController = require("./controllers/authController");
const userController = require("./controllers/userController");
const doctorController = require("./controllers/doctorController");
const nurseController = require("./controllers/nurseController");
const appointmentController = require("./controllers/appointmentController");
const adminController = require("./controllers/adminController");
const limiter = require("./middlewares/rateLimiter");
const router = express.Router();
const path = require('path'); 
const app = express();




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(corsMiddleware);

app.use(express.static(path.join(__dirname, '../frontend/dist'))); 

app.use("/auth",limiter, authController);
app.use("/user",limiter, userController);   
app.use("/doctor",limiter, doctorController);
app.use("/nurse",limiter, nurseController);
app.use("/appointment",limiter, appointmentController);
app.use("/admin",limiter, adminController);

// The "catchall" handler

app.use(errorHandlerMiddleware);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html')); 
});

(async () => {
  try {
    await connectToDatabase();
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
  }
})();
