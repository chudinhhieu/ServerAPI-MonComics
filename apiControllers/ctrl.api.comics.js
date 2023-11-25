var md = require("../models/comic.model");
var fs = require("fs");
const path = require("path");
var mdF = require("../models/favorite.model");
var mdCM = require("../models/comment.model");

exports.list = async (req, res, next) => {
  let list = [];
  try {
    const id_c = req.params.id_c;
    list = await md.comicModel.find({ idGenre: id_c });
  } catch (error) {
    console.log(error);
  }
  res.json(list);
};

exports.getOne = async (req, res, next) => {
  let comic = {};
  try {
    const id_c = req.params.id_c;
    comic = await md.comicModel.findById(id_c);
  } catch (error) {
    console.log(error);
  }
  return res.json(comic);
};

exports.addPost = async (req, res, next) => {
  console.log(req.files);
  try {
    let coverImagePath = "";
    let contentImagePaths = [];

    if (req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        if (req.files[i].fieldname === "coverImage") {
          fs.renameSync(
            req.files[i].path,
            `./public/comic_images/cover_images/${req.files[i].originalname}`
          );
          coverImagePath = req.files[i].originalname;
        } else if (req.files[i].fieldname === "contentImage") {
          fs.renameSync(
            req.files[i].path,
            `./public/comic_images/${req.files[i].originalname}`
          );
          contentImagePaths.push(req.files[i].originalname);
        }
      }
    }

    const newComic = new md.comicModel({
      name: req.body.name,
      idGenre: req.body.idGenre,
      description: req.body.description,
      publicationDate: req.body.publicationDate,
      author: req.body.author,
      coverImage: coverImagePath,
      contentImage: contentImagePaths,
      linkCM: req.body.linkCM,
    });

    const savedComic = await newComic.save();
    return res.json(savedComic);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.edit = async (req, res, next) => {
  let comicEdit = {};
 try {
  let sum =0;
  let id_c = req.params.id_c;
  comic = await md.comicModel.findById(id_c);
  let coverImagePath = "";
  let contentImagePaths = [];

  if (req.files.length > 0) {
    for (let i = 0; i < req.files.length; i++) {
      if (req.files[i].fieldname === "coverImage") {
      const oldImagePath = path.join("./public/comic_images/cover_images", comic.coverImage);
        
      fs.unlinkSync(oldImagePath);
        fs.renameSync(
          req.files[i].path,
          `./public/comic_images/cover_images/${req.files[i].originalname}`
        );
        coverImagePath = req.files[i].originalname;
      } else if (req.files[i].fieldname == "contentImage") {
        if(sum ==0){
          sum =1;
          for (const image of comic.contentImage) {
            const oldImagePath = path.join("./public/comic_images/", image);
            fs.unlinkSync(oldImagePath);
          }
        }
        fs.renameSync(
          req.files[i].path,
        
          `./public/comic_images/${req.files[i].originalname}`
        );
        contentImagePaths.push(req.files[i].originalname);
      }
    }
  }
  if (req.body.name) {
    comic.name = req.body.name;
  }
  if (req.body.idGenre) {
    comic.idGenre = req.body.idGenre;
  }
  if (req.body.description) {
    comic.description = req.body.description;
  }
  if (req.body.publicationDate) {
    comic.publicationDate = req.body.publicationDate;
  }
  if (req.body.author) {
    comic.author = req.body.author;
  }
  if (req.body.linkCM) {
    comic.linkCM = req.body.linkCM;
  }
  if (coverImagePath) {
    comic.coverImage = coverImagePath;
  }
  if (contentImagePaths.length > 0) {
    comic.contentImage = contentImagePaths;
  }
  comicEdit = await comic.save();
 } catch (error) {
  console.log(error);
 }
 return res.json(comicEdit);
};
exports.delete = async (req, res, next) => {
  let comic = {};
  let id = req.params.id_c;
  try {
    comic = await md.comicModel.findByIdAndDelete(id);
    await mdF.favoriteModel.deleteMany({id_comic: comic.id });
    await mdCM.commentModel.deleteMany({id_comic: comic.id});
    const oldImagePath = path.join("./public/comic_images/cover_images", comic.coverImage);
    fs.unlinkSync(oldImagePath);
    for (const image of comic.contentImage) {
      const oldImagePath = path.join("./public/comic_images/", image);
      fs.unlinkSync(oldImagePath);
    }
  } catch (error) {
    console.log(error);
  }
  return res.json(comic);
};
