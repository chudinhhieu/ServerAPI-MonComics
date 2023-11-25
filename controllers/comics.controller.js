var md = require("../models/comic.model");
var fs = require("fs");

exports.list = async (req, res, next) => {
  let list = null;
  let genre = null;
  try {
    genre = await md.grModel.find();
    list = await md.comicModel.find();
  } catch (error) {
    console.log(error);
  }
  res.render("comics/listComic", {
    title: "Comics",
    listComic: list,
    listGenre: genre,
  });
};

exports.add = async(req,res,next)=>{
    let genre = null;
    try {
      genre = await md.grModel.find();
    } catch (error) {
      console.log(error);
    }
    res.render('comics/addComic',{title: "Comics",listGenre: genre});
}

exports.addPost = async (req, res, next) => {
  try {
    fs.rename(
      req.file.path,
      "./public/comic_images/" + req.file.originalname,
      async (err) => {
        if (err) throw err;

        let objC = new md.comicModel();
        objC.name = req.body.name;
        objC.idGenre = req.body.idGenre;
        objC.description = req.body.description;
        objC.publicationDate = req.body.publicationDate;
        objC.author = req.body.author;
        objC.linkCM = req.body.linkCM;
        objC.coverImage = req.file.originalname;
        await objC.save();
        res.redirect("/comics");
      }
    );
  } catch (error) {
    msg = "Lỗi: " + error.message;
    console.log(error);
  }
};
