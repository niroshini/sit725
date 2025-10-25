const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const PORT = 3004;

// 1. Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/foodDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  mongoose.connection.on('connected', () => {
    console.log('✅ Connected to MongoDB');
  });
  
// 2) App + middleware
  const app = express();

  //debug
  app.get('/ping', (_req, res) => { 
  console.log('[HIT] /ping handler');
  res.send('pong');
});
  app.use((req,res,next)=>{ console.log(`[REQ] ${req.method} ${req.url}`); next(); });


  //app.get('/ping', (_req, res) => res.send('pong'));

  app.use(express.static(__dirname + '/public'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // 3) Routes (MVC). 
const foodRoutes = require('./routes/foodRoute');

app.use('/api/food', foodRoutes);
// Optional: integrity check
app.get('/api/_integrity-check', (_req, res) => res.sendStatus(204));

// 4) Root
app.get('/', (_req, res) => res.send('Welcome to the Food Menu Home Page!'));

// 5) 404 + error handlers
app.use((req, res) => res.status(404).json({ message: 'Not found' }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

// 6) Start
console.log('[BOOT] about to listen');
app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));






