const express = require('express');
const cors = require('cors')
require('dotenv').config();
const connectDB = require('./config/dbConnection');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
