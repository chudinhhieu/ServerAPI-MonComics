var md = require("../models/user.model");
var fs = require("fs");

exports.list = async (req, res, next) => {
  let list = [
    {
      _id: "",
      fullname: "",
      avatar: "",
      username: "",
      password: "",
      email: "",
    },
  ];
  try {
    list = await md.userModel.find();
    console.log(list.length == 0);
  } catch (error) {
    console.log(error);
  }
  res.render("users/listUser", { title: "Users", listUser: list });
};

exports.addPost = async (req, res, next) => {
  let msg = "";
  try {
    fs.rename(
      req.file.path,
      "./public/user_avatar/" +req.body.username+"_"+ req.file.originalname,
      async (err) => {
        if (err) throw err;
        let objU = new md.userModel();
        objU.fullname = req.body.fullname;
        objU.password = req.body.password;
        objU.email = req.body.email;
        objU.username = req.body.username;
        objU.avatar = req.body.username+"_"+req.file.originalname;
        await objU.save();
        res.redirect("/users");
      }
    );
  } catch (error) {
    msg = "Lỗi: " + error.message;
  }
};
exports.add = async (req, res, next) => {
  res.render("users/addUser", { title: "Add user" });
};
exports.edit = async (req, res, next) => {
  let id_u = req.params.id_u;
  let objU = null;
  try {
    objU = await md.userModel.findById(id_u);
  } catch (error) {
    console.log(error);
  }
  res.render("users/editUser", { title: "Edit user", userEdit: objU });
};
exports.editPost = async (req, res, next) => {
  try {
    const id_u = req.params.id_u;
    if(req.file){
      fs.rename(
        req.file.path,
        "./public/user_avatar/"+req.body.username+"_"+req.file.originalname,
        (err) => {
          if (err) throw err;
        }
      );
    }
    const objU = await md.userModel.findById(id_u);
    if(req.file){
      objU.avatar = req.body.username+"_"+req.file.originalname;
    }else{
      objU.avatar = objU.avatar;
    }
    objU.fullname = req.body.fullname;
    objU.password = req.body.password;
    objU.email = req.body.email;
    objU.username = req.body.username;
    await objU.save();
    res.redirect("/users");
  } catch (error) {
    console.log(error);
  }
};

exports.delete = async (req, res, next) => {
  let id_u = req.params.id_u;
      try {
          await md.userModel.findByIdAndDelete(id_u);
          res.redirect('/users')
      } catch (error) {
        console.log(error);
      }
};
