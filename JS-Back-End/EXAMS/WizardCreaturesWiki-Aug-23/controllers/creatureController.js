creatureController.get('/catalog', async (req, res) => {

    const creatures = await creatureService.getAll();

    res.render('catalog', {
        title: 'Catalog',
        creatures
    });

});

creatureController.get('/create', isUser(), (req, res) => {
    res.render('create', {
        title: 'Create',
    });
});

creatureController.post('/create', isUser(), async (req, res) => {
    try {
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All inputs must be filled!');
        }
        await creatureService.create(req.body, req.user._id);
        res.redirect('/creature/catalog');
    } catch (error) {
        res.render('create', {
            title: 'Create',
            error: errorParser(error),
            body: req.body
        });
    }
});

