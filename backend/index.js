const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const session = require('express-session')
const app = express()
const port = 3000

// https://expressjs.com/en/starter/examples.html

const googleClientId = '1017211957366-fcgfumc91a6t55np6eeg86r7q40av9rr.apps.googleusercontent.com'
const googleClientSecret = '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'

app.use(express.static('public'))
app.use(session({ secret: 'mysecret', resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})

// Google OAuth Strategy setup
passport.use(new GoogleStrategy({
  clientID: googleClientId,
  clientSecret: googleClientSecret,
  callbackURL: 'http://localhost:3000/auth/google/callback'
}, (token, tokenSecret, profile, done) => {
  return done(null, profile)
}))

// Google OAuth Routes

// Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to your Svelte app
    res.redirect('http://localhost:5173/')
  }
)

// Route to get current user info
app.get('/auth/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user)
  } else {
    res.status(401).json({ error: 'Unauthorized' })
  }
})

// Test endpoint
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
