const db = require('./db');

const favoriteSchema = new db.mongoose.Schema(
    {
        id_user: { type: db.mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
        id_comic: { type: db.mongoose.Schema.Types.ObjectId, ref: 'comicModel', required: true }
    },
    { collection: 'favorite' }
);

let favoriteModel = db.mongoose.model("favoriteModel", favoriteSchema);

module.exports = { favoriteModel };
