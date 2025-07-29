const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const fs = require('fs');

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Login Simulation
server.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8'));
  const user = db.users.find(u => u.email === email && u.password === password);

  if (user) {
    const { password, ...safeUser } = user;
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: safeUser
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }
});

// Register Simulation
server.post('/api/signup', (req, res) => {
  const { fullName, email, password } = req.body;
  const dbFile = path.join(__dirname, 'db.json');
  const db = JSON.parse(fs.readFileSync(dbFile, 'utf-8'));

  if (db.users.find(u => u.email === email)) {
    res.status(400).json({ success: false, message: 'Email already exists' });
    return;
  }

  const newUser = {
    id: Date.now(),
    fullName,
    email,
    password,
    points: 0,
    rewards: []
  };

  db.users.push(newUser);
  fs.writeFileSync(dbFile, JSON.stringify(db, null, 2));
  res.status(201).json({ success: true, user: newUser });
});

// Use default router
server.use('/api', router);

// Start server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
