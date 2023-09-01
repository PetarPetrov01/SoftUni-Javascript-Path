tripController.get('/create', isUser(), (req, res) => {
    res.render('create', {
        title: 'create'
    });
});

tripController.post('/create', isUser(), async (req, res) => {
    try {
        if (isNaN(req.body.price) && isNaN(req.body.seats)) {
            throw new Error('Available seats and price must be a number!');
        }
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All inputs must be filled!');
        }

        await createTrip(req.body, req.user._id);
        res.redirect('/trip/catalog');
    } catch (error) {
        res.render('create', {
            title: 'Create',
            error: errorParser(error),
            body: req.body
        });
    }
});
