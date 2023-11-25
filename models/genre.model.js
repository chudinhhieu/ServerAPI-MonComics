const db = require('./db');


const genreSchema = new db.mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String,required: true},
        description: { type: String,required: true},
    },
    {
        collection: 'genre'
    },

);

let genreModel = db.mongoose.model("genreModel", genreSchema);

module.exports = { genreModel };
