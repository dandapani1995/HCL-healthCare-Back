const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const winston = require('winston');
const helmet = require('helmet');
require('dotenv').config();
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const limiter = require('./middleware/rateLimit');
const routes  = require('./routes/index')
const connectDb = require('./utills/db')

const app = express();
require('dotenv').config();

//  Add security headers
app.use(helmet());
app.use(morgan('combined'));
const allowedOrigins = process.env.ALLOWEDORIGINS;
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // if using cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
// Limit repeated requests 
app.use(limiter);

// limit request body to 500 MB
app.use(express.json({ limit: '500mb' })); 
app.use(express.urlencoded({ limit: '500mb', extended: true }));
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
app.use(notFoundHandler);
app.use(errorHandler);

// Example route
app.use('/api',routes);

const PORT = process.env.PORT || 8000;
function serverStart(){
  connectDb().then(()=>{
      console.log("Database connected successfully")
      app.listen(PORT , () => {
          console.log("Server running on "+ PORT)
      })
  })
  .catch((err) => {
      console.log("DB connection failed !!"+ err)
  })
}
serverStart()