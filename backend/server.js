const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/dbConnection');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

connectDB();

const app = express();

const allowedOrigins = [
    process.env.API_URL1,
    process.env.API_URL2,
    process.env.API_URL3,
    process.env.API_URL4
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/projects', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
