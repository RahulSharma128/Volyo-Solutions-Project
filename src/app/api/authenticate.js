const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Replace this with your actual user data retrieval logic
const users = [
  { id: 1, email: 'user@example.com', password: 'password' },
];

// Configure Passport with a local strategy
passport.use(new LocalStrategy(
  (username, password, done) => {
    const user = users.find((u) => u.email === username && u.password === password);
    if (!user) {
      return done(null, false, { message: 'Incorrect username or password' });
    }
    return done(null, user);
  }
));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((u) => u.id === id);
  done(null, user);
});

// Authentication route
app.post('/api/authenticate',
  passport.authenticate('local', {
    successRedirect: '/success', // Redirect to a success page
    failureRedirect: '/failure', // Redirect to a failure page
  })
);

// Start the Express server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
