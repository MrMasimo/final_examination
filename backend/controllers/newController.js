const {News} = require('../models/news')

class NewsController {
    static async getItems(req, res) {
        try {
            const row = await News.getLastQueriesList();
            res.status(200).send(row);
        } catch (e) {
            console.log(e)
            res.status(500).send(e.message);
        }
    }

    static async createItem(req, res) {
        try {
            const {author, title, description, published_at, content} = req.body;
            if (!author || !title || !description || !published_at || !content ) {
                res.status(400).send({message: 'Не переданы обязательные поля'});
                return;
            }
            const row = await News.createItem(req.body);
            res.status(200).send(row);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }
}

module.exports = {NewsController}
