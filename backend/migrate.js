const {News} = require("./models/news");

Promise.all([
    News.createTable()
        .then(() => {
            console.log('таблица news создана')
        })
]).then(() => {
    console.log('миграция завершена')
    process.exit(0)
}).catch((e) => {
    console.log(e)
})
