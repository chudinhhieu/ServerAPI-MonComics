const db = require('./db');

const commentSchema = new db.mongoose.Schema(
    {
        id_user: { type: db.mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
        id_comic: { type: db.mongoose.Schema.Types.ObjectId, ref: 'comicModel', required: true },
        noiDung: { type: String, required: true },
        thoiGian: { type: Date, default: Date.now }
    },
    { collection: 'comment' }
);

let commentModel = db.mongoose.model("commentModel", commentSchema);

module.exports = { commentModel };
