const express = require('express');
const sessionExpress = require('express-session');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(sessionExpress({
    secret: 'something secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' }
}));

app.get('/', (req, res) => {
    console.log(req.session);
    const user = req.session.user || {
        username: 'Anonymous'
    };
    console.log(user.username);
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>INdex</title>
    </head>
    <body>
        <h1>Hello! ${user.username}</h1>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </body>
    </html>`);
});
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

app.post('/register', async (req, res) => {
    if (await req.auth.register(req.body.username, req.body.password)) {
        res.redirect('/');
    } else {
        res.status(401).send('User already exists');
    }
});

app.listen(3000, () => (console.log('Listening on port 3000...')));