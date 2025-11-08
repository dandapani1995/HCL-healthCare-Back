const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const morgan = require('morgan');
const winston = require('winston');
const helmet = require('helmet');
const connectDb = require('./db/connectDb');
const app = express();
require('dotenv').config();

//  Add security headers
app.use(helmet());

//  Enable CORS
app.use(cors());
//  Log HTTP requests
app.use(morgan('combined'));

// Limit repeated requests (100 per 15 min per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// app.use((req,res,next))

// 5️⃣ Create a Winston logger (for saving logs to file)
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' }),
  ],
});

// Example route
app.get('/', (req, res) => {
  logger.info('Root route accessed');
  res.send('🚀 Secure Node.js Express server running!');
});

// 6️⃣ Start the server
const PORT = process.env.PORT || 8000;

connectDb().then(()=>{
    app.listen(PORT , () => {
        console.log("Server running on "+ PORT)
    })
})
.catch((err) => {
    console.log("DB connection failed !!"+ err)
})
