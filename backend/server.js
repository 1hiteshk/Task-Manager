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
  'https://task-manager-git-master-hitesh-kumars-projects.vercel.app',
  'https://task-manager-three-rho.vercel.app',
  'https://task-manager-27e9p61hv-hitesh-kumars-projects.vercel.app',
  'http://localhost:3000'
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
