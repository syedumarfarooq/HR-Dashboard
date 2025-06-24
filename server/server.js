const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const promoteRoutes = require('./routes/promoteRoutes');
const userRoutes = require('./routes/userRoutes');
dotenv.config(); //  Load env variables

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection using env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/promote', promoteRoutes);
app.use('/api/user',userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
