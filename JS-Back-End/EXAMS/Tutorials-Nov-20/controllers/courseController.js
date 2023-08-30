courseController.get('/:id/details', async (req, res) => {
});
courseController.get('/create', (req, res) => {
    res.render('create');
});
courseController.get('/:id/edit', async (req, res) => {
});
courseController.post('/create', async (req, res) => {
    try {
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All inputs must be filled!');
        }
        await createCourse(req.body, req.user._id);
        res.redirect('/');
    } catch (error) {
        res.render('create', {
            error: errorParser(error),
            body: req.body
        });
    }
});
courseController.post('/:id/edit', async (req, res) => {
});
courseController.get('/:id/delete', async (req, res) => {
});
courseController.get('/:id/enroll', async (req, res) => {
});
module.exports = courseController;