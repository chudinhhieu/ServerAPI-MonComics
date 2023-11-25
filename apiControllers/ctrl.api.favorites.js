var md = require("../models/favorite.model");
var fs = require("fs");

exports.listFavoriteComic = async (req, res, next) => {
    let list = [];
    try {
        const id_c = req.params.id_c;
        list = await md.favoriteModel.find({ id_comic: id_c });
    } catch (error) {
        console.log(error);
    }
    res.json(list);
}
exports.listFavoriteUser = async (req, res, next) => {
    let list = [];
    try {
        const id_u = req.params.id_u;
        list = await md.favoriteModel.find({ id_user: id_u });
    } catch (error) {
        console.log(error);
    }
    res.json(list);
}
exports.check = async (req, res, next) => {
    let Favorite = {};
    const id_user = req.params.id_user;
    const id_comic = req.params.id_comic;
    try {
        Favorite = await md.favoriteModel.findOne({
            id_user: id_user,
            id_comic: id_comic
        });
    } catch (error) {
        console.log(error);
    }
    res.json(Favorite);
}
exports.add = async (req, res, next) => {
    let Favorite = {};
    const id_user = req.body.id_user;
    const id_comic = req.body.id_comic;

    try {
        const existingFavorite = await md.favoriteModel.findOne({
            id_user: id_user,
            id_comic: id_comic
        });

        if (existingFavorite) {
            res.json({ message: 'Đã tồn tại!' });
            return;
        }

        // Nếu chưa tồn tại, thêm mới vào cơ sở dữ liệu
        const newFavorite = new md.favoriteModel();
        newFavorite.id_user = id_user;
        newFavorite.id_comic = id_comic;
        Favorite = await newFavorite.save();
    } catch (error) {
        console.log(error);
    }
    res.json(Favorite);
}

exports.delete = async (req, res, next) => {
    let Favorite = {};
    const id_f = req.params.id_f;
    try {
        Favorite = await md.favoriteModel.findByIdAndDelete(id_f);
    } catch (error) {
        console.log(error);
    }
    res.json(Favorite);
}