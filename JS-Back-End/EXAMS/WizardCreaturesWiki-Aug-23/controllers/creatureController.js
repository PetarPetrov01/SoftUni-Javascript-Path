creatureController.get('/catalog', async (req, res) => {

    const creatures = await creatureService.getAll();

    res.render('catalog', {
        title: 'Catalog',
        creatures
    });

});
