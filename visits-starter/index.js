// server.js

const express = require('express');
const redis = require('redis');

const app = express();
const PORT = 5000;

// Create Redis client
const redisClient = redis.createClient({ host: 'redis', port: 6379 });


// Middleware to handle JSON data
app.use(express.json());

// CORS Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Endpoint to get the visitor count
app.get('/api/visitorCount', (req, res) => {
  redisClient.get('visitorCount', (err, count) => {
    if (err) {
      console.error('Failed to get visitor count:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json({ count: parseInt(count) });
  });
});

// Endpoint to increment the visitor count
app.post('/api/incrementVisitorCount', (req, res) => {
  redisClient.incr('visitorCount', (err, count) => {
    if (err) {
      console.error('Failed to increment visitor count:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json({ count: parseInt(count) });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
