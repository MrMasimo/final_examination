const {Router} = require('express');

const {NewsController} = require('../controllers/newController')

const newsRouter = Router();

newsRouter.get('/', NewsController.getItems);
newsRouter.post('/', NewsController.createItem);

module.exports = {newsRouter}
