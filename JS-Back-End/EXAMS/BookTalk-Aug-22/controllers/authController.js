const { compareSync } = require('bcrypt');
authController.get('/register', isGuest(), (req, res) => {
    res.render('register');
});

authController.post('/register', isGuest(), async (req, res) => {
    try {
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All inputs must be filled!');
        }

        if (req.body.password.length < 3) {
            throw new Error('Password must be atleast 3 characters long');
        }

        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match!');
        }

        const token = await register(req.body.email, req.body.username, req.body.password);
        res.cookie('token', token);
        res.redirect('/'); //Redirect depending on assignement 
    } catch (error) {
        res.render('register', {
            error: errorParser(error),
            body: {
                username: req.body.username,
                email: req.body.email
            }
        });
    }
});
