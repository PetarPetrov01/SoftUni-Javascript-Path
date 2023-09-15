const { isUser } = require('../middlewares/guards');
const { getAll, getByUserId, getById, createItem, updateItem, deleteItem } = require('../services/furnitureService');
const { errorParser } = require('../util/parseError');

const furnitureController = require('express').Router();

furnitureController.get('/', async (req, res) => {
    let items = [];
    if (req.query.where) {
        const userId = JSON.parse(req.query.where.split('=')[1]);
        items = await getByUserId(userId);
    } else {
        items = await getAll();
    }
    res.json(items);
});


furnitureController.get('/:id', async (req, res) => {
    const itemId = req.params.id;
    const item = await getById(itemId);
    res.json(item);
});

furnitureController.post('/', isUser(), async (req, res) => {
    try {
        const data = req.body;
        data._ownerId = req.user._id;

        const item = await createItem(data);
        res.json(item);
    } catch (error) {
        const message = errorParser(error);
        res.status(400).json({ message });
    }
});

furnitureController.put('/:id', isUser(), async (req, res) => {
    const item = await getById(req.params.id);

    if (req.user._id != item._ownerId) {
        return res.status(403).json({ message: 'You can\'t edit this record' });
    }

    try {
        const result = await updateItem(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        const message = errorParser(error);
        res.status(400).json({ message });
    }
});

furnitureController.delete('/:id', isUser(), async (req, res) => {
    const item = await getById(req.params.id);

    if (req.user._id != item._ownerId) {
        res.status(403).json({ message: 'You can\'t delete this record' });
    }

    try {
        await deleteItem(req.params.id);
        res.status(204).end();
    } catch (error) {
        const message = errorParser(message);
        res.json({ message });
    }
});


module.exports = furnitureController;