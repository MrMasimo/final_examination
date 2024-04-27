const {pool} = require('../database');
const dayjs = require("dayjs");

class News {
    static async createTable() {
        const res = await pool.query(
            "create table if not exists news (\n" +
            " id serial unique,\n" +
            " created_at timestamp not null,\n" +
            " author text not null,\n" +
            " title text not null,\n" +
            " description text not null,\n" +
            " published_at timestamp not null,\n" +
            " content text not null,\n" +
            " primary key(id)\n" +
            ");\n"
        );

        return res.rows;
    }

    static async getLastQueriesList(count = 10) {
        const selectRes = await pool.query('select p.* from news p ORDER BY p.id DESC LIMIT $1', [count]);

        return selectRes.rows;
    }

    static async createItem({author, title, description, published_at, content}) {
        const insertRes = await pool.query('insert into news(created_at, author, title, description, published_at, content ) values($1, $2, $3, $4, $5, $6) RETURNING *', [
            'now()',
            author,
            title,
            description,
            dayjs(published_at).format('YYYY-MM-DD HH:mm:ss'),
            content,
        ]);
        return insertRes.rows[0]
    }
}

module.exports = {News}
