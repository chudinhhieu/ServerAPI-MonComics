const db = require('./db');

const comicSchema = new db.mongoose.Schema(
    {
        name: { type: String, required: true },
        idGenre: { type: db.mongoose.Schema.Types.ObjectId,ref: 'genreModel'},
        description: { type: String, required: true },
        publicationDate: { type: Date, required: true },
        author: { type: String, required: true },
        coverImage:{ type: String, required: true },
        contentImage:[{ type: String, required: true }],
        linkCM: { type: String, required: true },
    },
    { collection: 'comic' }
);

let comicModel = db.mongoose.model("comicModel", comicSchema);

const grSchema = new db.mongoose.Schema(
    {
        name: { type: String, required: true },
    },
    {
        collection: 'genre'
    },
);

let grModel = db.mongoose.model("grModel", grSchema);

module.exports = { comicModel, grModel };
