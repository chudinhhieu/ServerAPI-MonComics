var md = require("../models/genre.model");
var mdC = require("../models/comic.model");
var mdF = require("../models/favorite.model");
var mdCM = require("../models/comment.model");
var fs = require("fs");
const path = require("path");

exports.list = async (req, res, next) => {
  let list = [];
  try {
    list = await md.genreModel.find();
  } catch (error) {
    console.log(error);
  }
  res.json(list);
};
exports.getOne = async (req, res, next) => {
  let genre = {};
  try {
    const id_g = req.params.id_g;
    genre = await md.genreModel.findById(id_g);
  } catch (error) {
    console.log(error);
  }
  return res.json(genre);
};
exports.add = async (req, res, next) => {
  let genre = {};
  try {
    let objG = new md.genreModel();
    fs.rename(
      req.file.path,
      "./public/genre_images/" + req.file.originalname,
      async (err) => {
        if (err) throw err;
      }
    );
    objG.image = req.file.originalname;
    objG.name = req.body.name;
    objG.description = req.body.description;
    genre = await objG.save();
  } catch (error) {
    console.log(error);
  }
  return res.json(genre);
};
exports.edit = async (req, res, next) => {
  let genre = {};
  try {
    const id_g = req.params.id_g;
    const objG = await md.genreModel.findById(id_g);
    if (req.file) {
      const oldImagePath = path.join("./public/genre_images/", objG.image);
      fs.unlinkSync(oldImagePath);

      const newImagePath = path.join(
        "./public/genre_images/",
        req.file.originalname
      );
      fs.renameSync(req.file.path, newImagePath);
      objG.image = req.file.originalname;
    }
    if (req.body.name) {
      objG.name = req.body.name;
    }
    if (req.body.description) {
      objG.description = req.body.description;
    }
    genre = await objG.save();
  } catch (error) {
    console.log(error);
  }
  return res.json(genre);
};
exports.delete = async (req, res, next) => {
  let genre = {};
  let id = req.params.id_g;

  try {
    const comics = await mdC.comicModel.find({ idGenre: id });

    for (const comic of comics) {
      for (const image of comic.contentImage) {
        const oldImagePath = path.join("./public/comic_images/", image);
        fs.unlinkSync(oldImagePath);
      }
      const oldComicImagePath = path.join("./public/comic_images/cover_images", comic.coverImage);
      fs.unlinkSync(oldComicImagePath);
    await mdF.favoriteModel.deleteMany({id_comic: comic.id });
    await mdCM.commentModel.deleteMany({id_comic: comic.id});
    }

    await mdC.comicModel.deleteMany({ idGenre: id });
    

    genre = await md.genreModel.findByIdAndDelete(id);

    const oldImagePath = path.join("./public/genre_images/", genre.image);
    fs.unlinkSync(oldImagePath);
  } catch (error) {
    console.log(error);
  }

  return res.json(genre);
};


