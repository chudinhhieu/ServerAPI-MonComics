var md = require("../models/genre.model");
var fs = require("fs");

exports.list = async (req, res, next) => {
  let list = [{ _id: "", name: "", image: "", description: "" }];
  try {
    list = await md.genreModel.find();
  } catch (error) {
    console.log(error);
  }
  res.render("genres/listGenre", { title: "Genres", listGenre: list });
};
exports.addPost = async (req, res, next) => {
  let msg = "";
  try {
    fs.rename(
      req.file.path,
      "./public/genre_images/" + req.file.originalname,
      async (err) => {
        if (err) throw err;
        let objG = new md.genreModel();
        objG.name = req.body.nameGenre;
        objG.description = req.body.descriptionGenre;
        objG.image = req.file.originalname;
        await objG.save();
        res.redirect("/genres");
      }
    );
  } catch (error) {
    msg = "Lỗi: " + error.message;
  }
};
exports.add = async (req, res, next) => {
  res.render("genres/addGenre", { title: "Add genres" });
};
exports.edit = async (req, res, next) => {
  let id_g = req.params.id_g;
  let objG = null;
  try {
    objG = await md.genreModel.findById(id_g);
  } catch (error) {
    console.log(error);
  }
  res.render("genres/editgenre", {
    title: "Cập nhật thể loại",
    genreEdit: objG,
  });
};
exports.editPost = async (req, res, next) => {
  try {
    const id_g = req.params.id_g;
    if (req.file) {
      fs.rename(
        req.file.path,
        "./public/genre_images/" + req.file.originalname,
        (err) => {
          if (err) throw err;
        }
      );
    }
    const objG = await md.genreModel.findById(id_g);
    if (req.file) {
      objG.image = req.file.originalname;
    } else {
      objG.image = objG.image;
    }
    objG.name = req.body.nameGenre;
    objG.description = req.body.descriptionGenre;
    await objG.save();
    res.redirect("/genres");
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res, next) => {
  let id_g = req.params.id_g;
      try {
          await md.genreModel.findByIdAndDelete(id_g);
          res.redirect('/genres')
      } catch (error) {
        console.log(error);
      }
};
