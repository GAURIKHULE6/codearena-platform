const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Route Imports
const authRoutes = require('./routes/auth');
const problemRoutes = require('./routes/problems');
const submissionRoutes = require('./routes/submissions');
const adminRoutes = require('./routes/admin');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/admin', adminRoutes); // ✅ Prefix is added

// Server
app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));
